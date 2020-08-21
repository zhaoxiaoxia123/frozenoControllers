import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {GlobalService} from "../../core/global.service";
import {ModalDirective} from "ngx-bootstrap";
import {FileUploader} from "ng2-file-upload";
import {isUndefined} from "util";

@Component({
    selector: 'app-sales-deposit',
    templateUrl: './sales-deposit.component.html'
})
export class SalesDepositComponent implements OnInit {
    depositList: any = [];
    editId: any = 0;
    orderId: any = 0;
    page: any;
    orderInfo: any = [];
    verifyInfo: any = [];
    search_array: any = ["全部订单","审核中","已同意","已拒绝"];
    search_state: number = 0;
    keyword: string = "";

    express_company: string = "";
    express_code: string = "";
    apply_amount: string = "";
    seller_mark: string = "";
    buyer_mark: string = "";

    imageAd:any=[];    //广告图片
    deleteImgId:any=[];    //delete img_id
    // 初始化上次图片变量
    public uploader:FileUploader = new FileUploader({
        url: this.globalService.getDomain() + "/api/v1/uploadFile",
        method: "POST",
        removeAfterUpload:true,
        itemAlias: "uploadedfile",
    });
    url : string = this.globalService.getDomain();
    path: any = [];
    imgCount : number = 0;
    selectedImageUrl : any[] = [];

    /**菜单id */
    menu_id:any;
    /** 权限 */
    permissions : Array<any> = [];
    menuInfos : any = [];
    rollback_url :string = '';
    constructor(
      private router : Router,
      private cookieStore:CookieStoreService,
      private globalService:GlobalService) {
        window.scrollTo(0,0);
    }

    ngOnInit() {
        //顶部菜单读取
        this.globalService.getMenuInfo();
        setTimeout(()=>{
            this.menu_id = this.globalService.getMenuId();
            this.rollback_url = this.globalService.getMenuUrl();
            this.permissions = this.globalService.getPermissions();
            this.menuInfos = this.globalService.getMenuInfos();
        },this.globalService.getMenuPermissionDelayTime());
        this.getDepositList(1);
    }


    /**
     * 获取押金列表
     */
    getDepositList(num){
        let url = 'getDepositList?page='+num+'&sid='+this.cookieStore.getCookie('sid');
        if (this.keyword.trim() != ''){
            url += '&keyword='+this.keyword;
        }
        url += '&search_state='+this.search_state;
        this.globalService.httpRequest('get',url)
          .subscribe((data)=>{
              this.depositList = data;
              if(this.depositList) {
                  if (this.depositList['status'] == 202) {
                      this.cookieStore.removeAll(this.rollback_url);
                      this.router.navigate(['/auth/login']);
                  }
              }
          });
    }

    /**
     * 获取押金列表
     */
    getDepositInfo(){
        if(this.editId == 0){
            alert('请在列表选中要操作的信息。');
            return false;
        }
        let url = 'getOrderInfo?o_id='+this.orderId+'&type=log&log_id='+this.editId+'&sid='+this.cookieStore.getCookie('sid');
        this.globalService.httpRequest('get',url)
          .subscribe((data)=>{
              this.orderInfo = data;
              this.lgModal.show();
              if(this.orderInfo) {
                  if (this.orderInfo['status'] == 202) {
                      this.cookieStore.removeAll(this.rollback_url);
                      this.router.navigate(['/auth/login']);
                  }
              }
          });
    }

    /**
     * 状态搜索
     * @param ind
     */
    selectSearchState(ind,num){
        if(num == 1) {
            this.search_state = ind;
        }
        this.getDepositList(1);
    }
    /**
     * 分页
     */
    pagination(page : string) {
        this.page = page;
        this.getDepositList(this.page);
    }

    /**
     * 顶部
     */
    isStatusShow(log_id:any,order_id:any) {
        this.editId = log_id;
        this.orderId = order_id;
    }

    /**
     * 显示审核表单
     */
    showVerify(){
        let url = 'getDepositInfo?log_id='+this.editId+'&sid='+this.cookieStore.getCookie('sid');
        this.globalService.httpRequest('get',url)
          .subscribe((data)=>{
              this.verifyInfo = data['result'];
              this.verifyModal.show();
              if(this.verifyInfo) {
                  if (data['status'] == 200) {
                    this.setValue();
                  }else if (data['status'] == 202) {
                      this.cookieStore.removeAll(this.rollback_url);
                      this.router.navigate(['/auth/login']);
                  }
              }
          });
    }

    // C: 定义事件，选择文件
    selectedFileOnChanged() {
        let that = this;
        let selectedArr = [];
        this.uploader.queue.forEach((q,i)=>{
            let reader = new FileReader();
            reader.readAsDataURL(q.some);
            reader.onload = function(e){
                let imgs = {
                    url:this.result,
                    uploadID:i,
                    type:'new',
                };
                selectedArr.push(imgs);
            }
        });
        this.imgCount = this.uploader.queue.length;
        this.selectedImageUrl = selectedArr.sort(that.compare('uploadID'));
    }

    //数组字段根据某一字段进行排序
    compare(property){
        return function(a,b){
            let value1 = a[property];
            let value2 = b[property];
            return value1 - value2;
        }
    }

    // D: 定义事件，上传文件  单个文件
    uploadFile() {
        // 上传
        let that = this;
        let len = that.uploader.queue.length;
        this.uploader.queue.forEach((q,i)=> {
            if (!isUndefined(that.uploader.queue[i])) {
                that.uploader.queue[i].onSuccess = function (response, status, headers) {
                    let tempRes = JSON.parse(response);
                    // 上传文件成功
                    if (status == 200) {
                        that.path.push(tempRes['result']);
                        if((i+1) >= len) {
                            that.selectedImageUrl = [];
                            alert("上传成功!");
                        }
                    } else {
                        // 上传文件后获取服务器返回的数据错误
                        alert(tempRes['msg']);
                    }
                };
                this.uploader.queue[i].upload(); // 开始上传
            } else {
                alert('找不到要上传的图片！');
            }
        });
    }

    /**
     * 移除队列中的图片
     * @param uploadID
     */
    removeUpload(uploadID) {
        //删除图片
        this.uploader.queue[uploadID].remove();
        this.selectedImageUrl.splice(uploadID, 1);
        this.selectedImageUrl.forEach((up, i) => {
            up.uploadID = i//重构与上传数据一致的结构
        });
        this.imgCount = this.uploader.queue.length;
        console.log(this.uploader);
    }

    //移除上传成功的图片
    removePath(pind){
        this.path.splice(pind, 1);
    }

    //移除修改数据库图片
    removeImg(imgIndex) {
        this.deleteImgId.push(imgIndex);
        this.imageAd.splice(imgIndex, 1);
    }
    /**
     * 赋值
     */
    setValue() {
        this.express_company = this.verifyInfo['apply_detail']['express_company'];
        this.express_code = this.verifyInfo['apply_detail']['express_code'];
        this.apply_amount = this.verifyInfo['apply_detail']['apply_amount'];
        this.seller_mark = this.verifyInfo['apply_detail']['seller_mark'];
        this.buyer_mark = this.verifyInfo['apply_detail']['buyer_mark'];
        this.imageAd = this.verifyInfo['apply_img'];
    }

    /**
     * 保存审核内容
     */
    submitVerify(num) {
        if(this.express_company == ''){
            alert('请填写选中分类！');
            return false;
        }
        this.globalService.httpRequest('post','submitVerify',{
            'log_id':this.editId,
            'express_company':this.express_company,
            'express_code':this.express_code,
            'apply_amount':this.apply_amount,
            'seller_mark':this.seller_mark,
            'buyer_mark':this.buyer_mark,
            'image_url':JSON.stringify(this.path),
            'delete_id':JSON.stringify(this.deleteImgId),
            'is_verify':num,
            'sid':this.cookieStore.getCookie('sid')
        }).subscribe( (data)=>{
              alert(data['msg']);
              if(data['status'] == 200){
                  this.verifyModal.hide();
                  this.getDepositList(1);
              }else if(data['status'] == 202){
                  this.cookieStore.removeAll(this.rollback_url);
                  this.router.navigate(['/auth/login']);
              }
          },
          response => {
              console.log('PATCH call in error', response);
          }
        );
    }


    @ViewChild('lgModal', { static: true }) public lgModal:ModalDirective;
    @ViewChild('verifyModal', { static: true }) public verifyModal:ModalDirective;

}
