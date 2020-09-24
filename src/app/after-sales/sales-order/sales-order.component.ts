import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";
import {isUndefined} from "util";
import {Router} from "@angular/router";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {GlobalService} from "../../core/global.service";
import {FileUploader} from "ng2-file-upload";

@Component({
    selector: 'app-sales-order',
    templateUrl: './sales-order.component.html'
})
export class SalesOrderComponent implements OnInit {
    orderList: any = [];
    orderId: any = 0;
    isVerify:number = 0;
    orderState:number = 0;
    page: any;
    orderInfo: any = [];
    verifyInfo: any = [];
    search_array: any = [];
    search_state: number = 0;
    order_state: number = 0;
    search_index: number = 0;
    keyword: string = "";

    express_company: string = "";
    express_code: string = "";
    order_num: string = "";
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
        this.search_array = [{"key":0,"value":"全部订单"},{"key":1,"value":"审核中"},{"key":2,"value":"已同意"},{"key":3,"value":"已拒绝"}];
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
        this.getOrderList(1);
    }


    /**
     * 获取押金列表
     */
    getOrderList(num){
        let url = 'getSalesOrderList?page='+num+'&sid='+this.cookieStore.getCookie('sid');
        if (this.keyword.trim() != ''){
            url += '&keyword='+this.keyword;
        }
        //  审核状态  +  订单状态
        url += '&search_state='+ this.search_state + '&order_state='+this.order_state;
        this.globalService.httpRequest('get',url)
          .subscribe((data)=>{
              this.orderList = data;
              if(this.orderList) {
                  if (this.orderList['status'] == 202) {
                      this.cookieStore.removeAll(this.rollback_url);
                      this.router.navigate(['/auth/login']);
                  }
              }
          });
    }

    /**
     * 获取订单详情
     */
    getOrderInfo(){
        if(this.orderId == 0){
            alert('请在列表选中要操作的信息。');
            return false;
        }
        let url = 'getOrderInfo?o_id='+this.orderId+'&type=sales&sid='+this.cookieStore.getCookie('sid');
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
        console.log(this.path);
    }

    /**
     * 状态搜索
     * @param ind
     */
    selectSearchState(ind,verify_state,order_state,num){
        if(num == 1) {
            this.search_index = ind;
            this.search_state = verify_state;
        }
        if(num == 3) {
            this.order_state = order_state;
        }
        this.getOrderList(1);
    }
    /**
     * 分页
     */
    pagination(page : string) {
        this.page = page;
        this.getOrderList(this.page);
    }

    /**
     * 顶部
     */
    isStatusShow(order_id:any,is_verify:number,orderState:number) {
        this.orderId = order_id;
        this.isVerify = is_verify;
        this.orderState = orderState;
    }

    /**
     * 显示审核表单
     */
    showVerify(){
        this.clearValue();
        this.path = [];
        let url = 'getOrderInfo?o_id='+this.orderId+'&type=sales&sid='+this.cookieStore.getCookie('sid');
        this.globalService.httpRequest('get',url)
          .subscribe((data)=>{
              this.verifyInfo = data['result'];
              console.log(this.verifyInfo);
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
        console.log(this.path);
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
        this.order_num = this.verifyInfo['apply_detail']['order'];
        this.apply_amount = this.verifyInfo['apply_detail']['apply_amount'];
        this.seller_mark = this.verifyInfo['apply_detail']['seller_mark'];
        this.buyer_mark = this.verifyInfo['apply_detail']['buyer_mark'];
        this.imageAd = this.verifyInfo['apply_img'];
    }


    /**
     * 赋空值
     */
    clearValue() {
        this.verifyInfo = [];
        this.express_company = '';
        this.express_code = '';
        this.order_num = '';
        this.apply_amount = '';
        this.seller_mark = '';
        this.buyer_mark = '';
        this.imageAd = [];
    }
    /**
     * 保存审核内容
     */
    submitVerify(num) {
        if(this.express_company == '' && this.express_code == '' && this.apply_amount == '' && this.seller_mark == ''){
            alert('请填写需提交的信息后再保存！');
            return false;
        }
        this.globalService.httpRequest('post','submitOrderVerify',{
            'o_id':this.orderId,
            'express_company':this.express_company,
            'express_code':this.express_code,
            'order':this.order_num,
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
                  this.getOrderList(1);
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
