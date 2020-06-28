import { Component, OnInit, ViewChild} from '@angular/core';
import {FadeInTop} from '../../shared/animations/fade-in-top.decorator';
import {CookieStoreService} from '../../shared/cookies/cookie-store.service';
import {Router} from '@angular/router';
import {GlobalService} from '../../core/global.service';
import {ModalDirective} from "ngx-bootstrap";
import {FileUploader} from "ng2-file-upload";
import {isUndefined} from "util";

@FadeInTop()
@Component({
  selector: 'app-product',
  styleUrls: ['./product.css'],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  productList:any = [];
  editId: any = 0;
  page : any;
  productInfo:any = [];

  category_desc:string='';
  frozeno_amount:string='';
  frozeno_discount_amount:string='';
  frozeno_is_show_app:number=0;
  frozeno_is_discount:number=0;
  frozeno_is_sub_dry:number=0;
  frozeno_ticket_amount:string='';

  // 初始化上次图片变量
  public uploader1:FileUploader = new FileUploader({
    url: this.globalService.getDomain() + "/api/v1/uploadFile",
    method: "POST",
    removeAfterUpload:true,
    itemAlias: "producthome",
  });
  public uploader2:FileUploader = new FileUploader({
    url: this.globalService.getDomain() + "/api/v1/uploadFile",
    method: "POST",
    removeAfterUpload:true,
    itemAlias: "productdetail",
  });
  public uploader3:FileUploader = new FileUploader({
    url: this.globalService.getDomain() + "/api/v1/uploadFile",
    method: "POST",
    removeAfterUpload:true,
    itemAlias: "productmain",
  });
  public uploader4:FileUploader = new FileUploader({
    url: this.globalService.getDomain() + "/api/v1/uploadFile",
    method: "POST",
    removeAfterUpload:true,
    itemAlias: "productdetailkj",
  });
  // imgCount : number = 0;

  imageAd1:any=[];    //首页商品图片
  deleteImgId1:any=[];    //delete img_id
  selectedImageUrl1 : any[] = [];
  path1:any = [];

  imageAd2:any=[];    //商品详情顶部滚动图片
  deleteImgId2:any=[];    //delete img_id
  selectedImageUrl2 : any[] = [];
  path2:any = [];

  imageAd3:any=[];    //商品详情图片
  deleteImgId3:any=[];    //delete img_id
  selectedImageUrl3 : any[] = [];
  path3:any = [];

  imageAd4:any=[];    //商品详情科技图片
  deleteImgId4:any=[];    //delete img_id
  selectedImageUrl4 : any[] = [];
  path4:any = [];

  editImgWeight : any = [];
  // url : string = this.globalService.getDomain();
  /**菜单id */
  menu_id:any;
  /** 权限 */
  permissions : Array<any> = [];
  menuInfos : any = [];

  rollback_url :string = '';
  constructor(
      private router : Router,
      private cookieStore:CookieStoreService,
      private globalService:GlobalService
  ) {
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
    this.getProductList(1);
  }
  /**
   * 是否有该元素
   */
  isPermission(menu_id,value){
    let key = menu_id +'_'+value;
    if(value == ''){
      key = menu_id;
    }
    return this.cookieStore.in_array(key, this.permissions);
  }

  // C: 定义事件，选择文件
  selectedFileOnChangedFun(num=0) {
    if(num == 1){
      this.selectedFileOnChanged(this.selectedImageUrl1,this.uploader1.queue);
    }else if(num == 2){
      this.selectedFileOnChanged(this.selectedImageUrl2,this.uploader2.queue);
    }else if(num == 3){
      this.selectedFileOnChanged(this.selectedImageUrl3,this.uploader3.queue);
    }else if(num == 4){
      this.selectedFileOnChanged(this.selectedImageUrl4,this.uploader4.queue);
    }
    // let $this = this;
    // let selectedArr = this.selectedImageUrl1;
    // this.uploader1.queue.forEach((q,i)=>{
    //   let reader = new FileReader();
    //   reader.readAsDataURL(q.some);
    //   reader.onload = function(e){
    //     let imgs = {
    //       url:this.result,
    //       uploadID:i,
    //       // pIndex:index
    //     };
    //     if(selectedArr.length > 0){
    //       let isSame = false;
    //       if(!isSame){
    //         selectedArr.push(imgs);
    //       }else{
    //         $this.uploader1.queue[i].remove();
    //       }
    //     }else{
    //       selectedArr.push(imgs);
    //     }
    //   }
    // });
    // // this.imgCount = this.uploader.queue.length;
    // this.selectedImageUrl1 = selectedArr;
  }

  // C: 定义事件，选择文件
  selectedFileOnChanged(selectedImageUrl,uploader) {
    let that = this;
    let selectedArr = selectedImageUrl;
    uploader.forEach((q,i)=>{
        let reader = new FileReader();
        reader.readAsDataURL(q.some);
        reader.onload = function(e){
          let imgs = {
            url:this.result,
            uploadID:i,
            // pIndex:index
          };
          if(selectedArr.length > 0){
            let isSame = false;
            if(!isSame){
              selectedArr.push(imgs);
            }else{
              uploader[i].remove();
            }
          }else{
            selectedArr.push(imgs);
          }
        }
    });
    // this.imgCount = this.uploader.queue.length;
    selectedImageUrl = selectedArr;
  }

  // D: 定义事件，上传文件  单个文件
  //num :1:首页 2：顶部滚动 3：详情
  uploadFileFun(num) {
    let that = this;
    if(num == 1) {
      that.uploadFile(that.uploader1.queue,that.selectedImageUrl1,that.path1,that.imageAd1);
    }else if(num == 2) {
      that.uploadFile(that.uploader2.queue, that.selectedImageUrl2, that.path2, that.imageAd2);
    }else if(num == 3) {
      that.uploadFile(that.uploader3.queue, that.selectedImageUrl3, that.path3, that.imageAd3);
    }else if(num == 4) {
      that.uploadFile(that.uploader4.queue, that.selectedImageUrl4, that.path4, that.imageAd4);
    }
      // let len = that.uploader1.queue.length;
      // this.uploader1.queue.forEach((q, i) => {
      //   if (!isUndefined(that.uploader1.queue[i])) {
      //     that.uploader1.queue[i].onSuccess = function (response, status, headers) {
      //       let tempRes = JSON.parse(response);
      //       // 上传文件成功
      //       if (status == 200) {
      //         that.path1.push(tempRes['result']);
      //         that.imageAd1 = [];
      //         if ((i + 1) >= len) {
      //           that.selectedImageUrl1 = [];
      //           alert("上传成功!");
      //         }
      //       } else {
      //         alert(tempRes['msg']);
      //       }
      //     };
      //     this.uploader1.queue[i].upload(); // 开始上传
      //   } else {
      //     alert('找不到要上传的图片！');
      //   }
      // });
  }

  // D: 定义事件，上传文件  单个文件
  //num :1:首页 2：顶部滚动 3：详情
  uploadFile(uploader,selectedImageUrl,path,imageAd) {
    let len = uploader.length;
    uploader.forEach((q, i) => {
      if (!isUndefined(uploader[i])) {
        uploader[i].onSuccess = function (response, status, headers) {
          let tempRes = JSON.parse(response);
          // 上传文件成功
          if (status == 200) {
            path.push(tempRes['result']);
            imageAd = [];
            if ((i + 1) >= len) {
              selectedImageUrl = [];
              alert("上传成功!");
            }
          } else {
            alert(tempRes['msg']);
          }
        };
        uploader[i].upload(); // 开始上传
      } else {
        alert('找不到要上传的图片！');
      }
    });

    this.clearSelectImage();
  }

  /**
   * 移除队列中的图片
   * @param uploadID
   */
  removeUpload(num,uploadID) {
    if(num == 1) {
      //删除图片
      this.uploader1.queue[uploadID].remove();
      this.selectedImageUrl1.splice(uploadID, 1);
      this.selectedImageUrl1.forEach((up, i) => {
        up.uploadID = i//重构与上传数据一致的结构
      });
    }else if(num == 2) {
      //删除图片
      this.uploader2.queue[uploadID].remove();
      this.selectedImageUrl2.splice(uploadID, 1);
      this.selectedImageUrl2.forEach((up, i) => {
        up.uploadID = i//重构与上传数据一致的结构
      });
    }else if(num == 3) {
      //删除图片
      this.uploader3.queue[uploadID].remove();
      this.selectedImageUrl3.splice(uploadID, 1);
      this.selectedImageUrl3.forEach((up, i) => {
        up.uploadID = i//重构与上传数据一致的结构
      });
    }else if(num == 4) {
      //删除图片
      this.uploader4.queue[uploadID].remove();
      this.selectedImageUrl4.splice(uploadID, 1);
      this.selectedImageUrl4.forEach((up, i) => {
        up.uploadID = i//重构与上传数据一致的结构
      });
    }
    // this.uploader.queue.length;
    // console.log(this.uploader);
  }

  //移除上传成功的图片
  removePath(num,pind){
    if(num == 1) {
      this.path1.splice(pind, 1);
    }else if(num == 2) {
      this.path2.splice(pind, 1);
    }else if(num == 3) {
      this.path3.splice(pind, 1);
    }else if(num == 4) {
      this.path4.splice(pind, 1);
    }
  }

  //移除修改数据库图片
  removeImg(num,img_id,imgIndex){
    if(num == 1) {
      this.deleteImgId1.push(img_id);
      this.imageAd1.splice(imgIndex, 1);
    }else if(num == 2) {
      this.deleteImgId2.push(img_id);
      this.imageAd2.splice(imgIndex, 1);
    }else if(num == 3) {
      this.deleteImgId3.push(img_id);
      this.imageAd3.splice(imgIndex, 1);
    }else if(num == 4) {
      this.deleteImgId4.push(img_id);
      this.imageAd4.splice(imgIndex, 1);
    }
  }


  onCheck(type,radio) {
    if(type == 1) {
      this.frozeno_is_show_app = radio;
    }else if(type == 2){
      this.frozeno_is_discount = radio;
    }else if(type == 3){
      this.frozeno_is_sub_dry = radio;
    }
  }

  /**
   * 顶部
   */
  isStatusShow(id:any){
    this.editId = id;
  }
  /**
   * 获取文章列表
   * @param num
   */
  getProductList(num:number){
    let url = 'getCategoryList?category_type='+this.globalService.category_type+'&page='+num+'&sid='+this.cookieStore.getCookie('sid');
    this.globalService.httpRequest('get',url)
      .subscribe((data)=>{
        this.productList = data;
        if(this.productList) {
          if (this.productList['status'] == 202) {
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }
        }
      });
  }

  /**
   * 分页
   */
  pagination(page : string) {
    this.page = page;
    this.getProductList(this.page);
  }
  /**
   * 添加
   */
  submitCategory(){
    if(this.category_desc.trim() == ''){
      alert('请填写商品名称！');
      return false;
    }else if(this.frozeno_amount.trim() == ''){
      alert('请填写商品价格！');
      return false;
    }else if(this.frozeno_discount_amount.trim() == ''){
      alert('请填写商品优惠价格！');
      return false;
    }
    this.globalService.httpRequest('post','editCategory',{
      'category_id':this.editId,
      'category_type':this.globalService.category_type,
      'category_desc':this.category_desc,
      'frozeno_amount':this.frozeno_amount,
      'frozeno_discount_amount':this.frozeno_discount_amount,
      'frozeno_is_show_app':this.frozeno_is_show_app,
      'frozeno_is_discount':this.frozeno_is_discount,
      'frozeno_is_sub_dry':this.frozeno_is_sub_dry,
      'frozeno_ticket_amount':this.frozeno_ticket_amount,
      'image_url_home':JSON.stringify(this.path1),
      'delete_id_home':JSON.stringify(this.deleteImgId1),
      'image_url_detail':JSON.stringify(this.path2),
      'delete_id_detail':JSON.stringify(this.deleteImgId2),
      'image_url_main':JSON.stringify(this.path3),
      'delete_id_main':JSON.stringify(this.deleteImgId3),
      'image_url_detail_kj':JSON.stringify(this.path4),
      'delete_id_detail_kj':JSON.stringify(this.deleteImgId4),
      'sid':this.cookieStore.getCookie('sid')
    }).subscribe( (data)=>{
      if(data) {
        alert(data['msg']);
        if (data['status'] == 200) {
          this.lgModal.hide();
          this.getProductList(1);
          this.clear();  //清除数据
        } else if (data['status'] == 202) {
          this.cookieStore.removeAll(this.rollback_url);
          this.router.navigate(['/auth/login']);
        }
      }
    },
    response => {
      console.log('PATCH call in error', response);
    });
  }

  doPushEditImg(pimg){
    this.editImgWeight.forEach((v, i) => {
      if(v.img_id == pimg['img_id']){
        this.editImgWeight.splice(i,1);
      }
    });
    this.editImgWeight.push(pimg);
  }
  /**
   * 提交详情图片权重
   */
  submitDetailImg(){
    // if(this.productInfo['resutl']['product_image'] != ''){
    //   alert('请填写该图片的权重信息！');
    //   return false;
    // }
    console.log(this.editImgWeight);
    this.globalService.httpRequest('post','editImagesWeigth',{
      'images':JSON.stringify(this.editImgWeight),
      'sid':this.cookieStore.getCookie('sid')
    }).subscribe( (data)=>{
        if(data) {
          alert(data['msg']);
          if (data['status'] == 200) {
            this.imgModal.hide();
          } else if (data['status'] == 202) {
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }
        }
      },
      response => {
        console.log('PATCH call in error', response);
      });
  }


  clear(){
    this.category_desc = '';
    this.frozeno_amount = '';
    this.frozeno_discount_amount = '';
    this.frozeno_is_show_app=0;
    this.frozeno_is_discount=0;
    this.frozeno_is_sub_dry=0;
    this.frozeno_ticket_amount = '';
    this.path1 = [];
    this.path2 = [];
    this.path3 = [];
    this.path4 = [];
    this.imageAd1 = [];
    this.imageAd2 = [];
    this.imageAd3 = [];
    this.imageAd4 = [];
    this.clearSelectImage();
  }

  clearSelectImage(){
    this.selectedImageUrl1 = [];
    this.selectedImageUrl2 = [];
    this.selectedImageUrl3 = [];
    this.selectedImageUrl4 = [];
  }
  /**
   * number =4 读取冻龄智美商品详情  并查看详情图片
   * 查询商品详情
   */
  getProductInfo(type=''){
    this.clear();
    this.productInfo = [];
    if(this.editId == 0){
      alert('请在列表选中要操作的信息。');
      return false;
    }
    let url = 'getCategoryById?category_id='+this.editId+'&number=4&sid='+this.cookieStore.getCookie('sid');
    this.globalService.httpRequest('get',url)
      .subscribe((data)=>{
        this.setValue(data['result']);
        if(type == 'edit') {
          this.lgModal.show();
        }else if(type == 'detail'){
          this.detailModal.show();
        }else if(type == 'img'){
          this.imgModal.show();
        }
        this.productInfo = data;
        if(this.productInfo) {
          if (this.productInfo['status'] == 202) {
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }
        }
      });
  }

  setValue(info:any){
    this.category_desc = info['category_desc'];
    this.frozeno_amount = info['frozeno_amount'];
    this.frozeno_discount_amount = info['frozeno_discount_amount'];
    this.frozeno_is_show_app = info['frozeno_is_show_app'];
    this.frozeno_is_discount = info['frozeno_is_discount'];
    this.frozeno_is_sub_dry = info['frozeno_is_sub_dry'];
    this.frozeno_ticket_amount = info['frozeno_ticket_amount'];
    if(info['product_image']){
      for (let a=0;a<info['product_image'].length;a++){
        if(info['product_image'][a]['type'] == 3){ //3：首页图片
          this.imageAd1.push(info['product_image'][a]);
        }else if(info['product_image'][a]['type'] == 2 && info['product_image'][a]['detail_type'] == 1){ //2：详情图片
          this.imageAd2.push(info['product_image'][a]);
        }else if(info['product_image'][a]['type'] == 1){ //1：头部图片
          this.imageAd3.push(info['product_image'][a]);
        }else if(info['product_image'][a]['type'] == 2 && info['product_image'][a]['detail_type'] == 2){ //2：详情科技图片
          this.imageAd4.push(info['product_image'][a]);
        }
      }
    }
  }
  /**
   * 删除
   */
  deleteProduct(){
    if(this.editId == 0){
      alert('请在列表选中要操作的信息。');
      return false;
    }
    let msg = '您确定要执行此删除操作吗？';
    if(confirm(msg)) {
      let url ='deleteCategory?category_id=' + this.editId + '&sid=' + this.cookieStore.getCookie('sid');
      this.globalService.httpRequest('delete',url)
        .subscribe((data) => {
          if(data['status'] == 202){
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }else if(data['status'] == 200){
            this.getProductList(this.page);
          }
        });
    }
  }

  @ViewChild('lgModal', { static: true }) public lgModal:ModalDirective;
  @ViewChild('detailModal', { static: true }) public detailModal:ModalDirective;
  @ViewChild('imgModal', { static: true }) public imgModal:ModalDirective;

}
