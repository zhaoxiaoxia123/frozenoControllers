import { Component, OnInit, ViewChild} from '@angular/core';
import {FadeInTop} from '../../shared/animations/fade-in-top.decorator';
import {CookieStoreService} from '../../shared/cookies/cookie-store.service';
import {Router} from '@angular/router';
import {GlobalService} from '../../core/global.service';
import {ModalDirective} from "ngx-bootstrap";
import {FileUploader} from "ng2-file-upload";
import {isUndefined} from "util";
import {interval} from "rxjs/index";

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

  upimg = '';
  downimg = '';
  uploadImageCount : number = 0;

  private interval;
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

  editImageWeight2:any=[];    //商品详情顶部滚动图片
  editImageWeight3:any=[];    //商品详情图片
  editImageWeight4:any=[];    //商品详情科技图片

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
    console.log(num);
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
    let that = this;
    let len = uploader.length;
    uploader.forEach((q, i) => {
      if (!isUndefined(uploader[i])) {
        uploader[i].onSuccess = function (response, status, headers) {
          let tempRes = JSON.parse(response);
          console.log('status:----');
          console.log(status);
          // 上传文件成功
          if (status == 200) {
            path.push(tempRes['result']);
            imageAd = [];
            if ((i + 1) >= len) {
              selectedImageUrl = [];
              // alert("上传成功!");
            }
            that.uploadImageCount += 1;
            console.log('that.uploadImageCount');
            console.log(that.uploadImageCount);
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

  imgmousedown(e,img) {
    console.log('down');
    console.log(img);
    this.downimg =  img;
    //防止浏览器默认行为(W3C)
    if(e && e.preventDefault){
      e.preventDefault();
    }
    //IE中组织浏览器行为
    else{
      window.event.returnValue=false;
      return false;
    }
  }

  /**
   *
   * @param img
   * @param num  移动图片 1:上传前  2:上传后
   * @param type  移动图片类型  1:首页 2:详情顶部 3:详情图片 4:详情科技
   */
  imgmouseup(img,num,type) {
    console.log('up');
    console.log(img);
    console.log(num);
    console.log(type);
    this.upimg =  img;
    // 这里为排序方式 这里用的是按下鼠标图片和抬起鼠标图片相互替换
    let downimgnum = 0;
    let upimgnum = 0;
    let downimgtext = '';
    let upimgtext = '';

    let editImgList: any = [];
    // if(num == 1){
    //   if(type == 1) {
    //     editImgList = this.selectedImageUrl1;
    //   }else if(type == 2) {
    //     editImgList = this.selectedImageUrl2;
    //   }else if(type == 3) {
    //     editImgList = this.selectedImageUrl3;
    //   }else if(type == 4) {
    //     editImgList = this.selectedImageUrl4;
    //   }
    // }else
    if(num == 2){
      // if(type == 1) {
      //   editImgList = this.imageAd1;
      // }else
      if(type == 2) {
        editImgList = this.imageAd2;
      }else if(type == 3) {
        editImgList = this.imageAd3;
      }else if(type == 4) {
        editImgList = this.imageAd4;
      }
    }
    for (let i = 0; i < editImgList.length; i++) {
      if (editImgList[i]['image_url'] === this.downimg) {
        downimgnum = i;
        downimgtext = editImgList[i]['image_url'];
      }
      if (editImgList[i]['image_url'] === this.upimg) {
        upimgnum = i;
        upimgtext = editImgList[i]['image_url'];
      }
    }
    editImgList[downimgnum]['image_url'] = upimgtext;
    editImgList[upimgnum]['image_url'] = downimgtext;

    // if(num == 1){
    //   if(type == 1) {
    //     this.selectedImageUrl1 = editImgList;
    //   }else if(type == 2) {
    //     this.selectedImageUrl2 = editImgList;
    //   }else if(type == 3) {
    //     this.selectedImageUrl3 = editImgList;
    //   }else if(type == 4) {
    //     this.selectedImageUrl4 = editImgList;
    //   }
    // }else
      if(num == 2){
      // if(type == 1) {
      //   this.imageAd1 = editImgList;
      // }else
      if(type == 2) {
        this.imageAd2 = editImgList;

        this.editImageWeight2.forEach((val, idx, array) => {
          if(val['img_id'] == editImgList[downimgnum]['img_id']){
            this.editImageWeight2.splice(idx,1);
          }
          if(val['img_id'] == editImgList[upimgnum]['img_id']){
            this.editImageWeight2.splice(idx,1);
          }
        });
        this.editImageWeight2.push(editImgList[downimgnum]);
        this.editImageWeight2.push(editImgList[upimgnum]);
      }else if(type == 3) {
        this.imageAd3 = editImgList;
        this.editImageWeight3.forEach((val, idx, array) => {
          if(val['img_id'] == editImgList[downimgnum]['img_id']){
            this.editImageWeight3.splice(idx,1);
          }
          if(val['img_id'] == editImgList[upimgnum]['img_id']){
            this.editImageWeight3.splice(idx,1);
          }
        });
        this.editImageWeight3.push(editImgList[downimgnum]);
        this.editImageWeight3.push(editImgList[upimgnum]);
      }else if(type == 4) {
        this.imageAd4 = editImgList;
        this.editImageWeight4.forEach((val, idx, array) => {
          if(val['img_id'] == editImgList[downimgnum]['img_id']){
            this.editImageWeight4.splice(idx,1);
          }
          if(val['img_id'] == editImgList[upimgnum]['img_id']){
            this.editImageWeight4.splice(idx,1);
          }
        });
        this.editImageWeight4.push(editImgList[downimgnum]);
        this.editImageWeight4.push(editImgList[upimgnum]);
      }
    }
    console.log(this.imageAd2);
    console.log(this.imageAd3);
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
    let that = this;
    if(that.category_desc.trim() == ''){
      alert('请填写商品名称！');
      return false;
    }else if(that.frozeno_amount.trim() == ''){
      alert('请填写商品价格！');
      return false;
    }else if(that.frozeno_discount_amount.trim() == ''){
      alert('请填写商品优惠价格！');
      return false;
    }
    that.uploadFileFun(1);
    that.uploadFileFun(2);
    that.uploadFileFun(3);
    that.uploadFileFun(4);
    let imgCount = that.uploader1.queue.length+that.uploader2.queue.length+that.uploader3.queue.length+that.uploader4.queue.length;
    that.interval = setInterval(() => {
      if(that.uploadImageCount == imgCount){
        this.interval && clearInterval(this.interval);
        that.globalService.httpRequest('post','editCategory',{
          'category_id':that.editId,
          'category_type':that.globalService.category_type,
          'category_desc':that.category_desc,
          'frozeno_amount':that.frozeno_amount,
          'frozeno_discount_amount':that.frozeno_discount_amount,
          'frozeno_is_show_app':that.frozeno_is_show_app,
          'frozeno_is_discount':that.frozeno_is_discount,
          'frozeno_is_sub_dry':that.frozeno_is_sub_dry,
          'frozeno_ticket_amount':that.frozeno_ticket_amount,
          'image_url_home':JSON.stringify(that.path1),
          'delete_id_home':JSON.stringify(that.deleteImgId1),
          'image_url_detail':JSON.stringify(that.path2),
          'delete_id_detail':JSON.stringify(that.deleteImgId2),
          'image_url_main':JSON.stringify(that.path3),
          'delete_id_main':JSON.stringify(that.deleteImgId3),
          'image_url_detail_kj':JSON.stringify(that.path4),
          'delete_id_detail_kj':JSON.stringify(that.deleteImgId4),
          'edit_image_weight2':JSON.stringify(that.editImageWeight2),
          'edit_image_weight3':JSON.stringify(that.editImageWeight3),
          'edit_image_weight4':JSON.stringify(that.editImageWeight4),
          'sid':that.cookieStore.getCookie('sid')
        }).subscribe( (data)=>{
            if(data) {
              alert(data['msg']);
              if (data['status'] == 200) {
                that.lgModal.hide();
                that.getProductList(1);
                that.clear();  //清除数据
              } else if (data['status'] == 202) {
                that.cookieStore.removeAll(that.rollback_url);
                that.router.navigate(['/auth/login']);
              }
            }
          },
          response => {
            console.log('PATCH call in error', response);
          });
      }
    }, 1000);
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
