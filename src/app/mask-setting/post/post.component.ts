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
  selector: 'app-post',
  styleUrls: ['./post.css'],
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  postList:any = [];
  editId: any = 0;
  page : any;
  postInfo:any = [];

  title:string;
  href:string;
  tag:string;
  introduction:string;
  type:number=0;
  state:number=1;
  is_href:number=2;
  weight:number=0;
  theme:string;
  startDate:string;
  endDate:string;
  description:string;

  imageAd:string;    //广告图片
  imageHead:string;  //封面图片

  // 初始化上次图片变量
  public uploader:FileUploader = new FileUploader({
    url: this.globalService.getDomain() + "/api/v1/uploadFile",
    method: "POST",
    removeAfterUpload:true,
    itemAlias: "uploadedfile",
  });

  imgCount : number = 0;
  selectedImageUrl : any[] = [];

  typeList:any = [];
  checkTypeId: number = 0;
  checkTypeName: string = '全部';
  url : string = this.globalService.getDomain();
  path:string = '';
  path2:string = '';
  /**菜单id */
  menu_id:any;
  /** 权限 */
  permissions : Array<any> = [];
  menuInfos : any = [];

  rollback_url :string = '';

  constructor(
      private router : Router,
      private cookieStore:CookieStoreService,
      private globalService:GlobalService,
      // private sanitizer: DomSanitizer
  ) {
    window.scrollTo(0,0);
    this.typeList = [
      {'id':1,'name':'帮助与客服'},
      {'id':2,'name':'成长课堂'},
      {'id':3,'name':'产品百科'},
      {'id':4,'name':'规则中心'},
      {'id':5,'name':'政策中心'},
      {'id':6,'name':'系统通知'},
      {'id':7,'name':'冻龄智美通知'},
      {'id':8,'name':'激励中心'},
      {'id':9,'name':'app商城广告'},
      {'id':10,'name':'工作台腰部广告'},
      {'id':11,'name':'冻龄智会员协议'},
      {'id':12,'name':'app商城其他广告'},
      {'id':13,'name':'app商城关于我们广告'},
      {'id':14,'name':'冻龄智美服务协议'},
      {'id':15,'name':'隐私政策'},
      {'id':16,'name':'会员体系图片'},
      {'id':17,'name':'售后图片'}
    ];
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
    this.getPostList(1);
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
  selectedFileOnChanged(index) {
    let $this = this;
    let selectedArr = this.selectedImageUrl;
    this.uploader.queue.forEach((q,i)=>{
        let reader = new FileReader();
        reader.readAsDataURL(q.some);
        reader.onload = function(e){
          let imgs = {
            url:this.result,
            uploadID:i,
            pIndex:index
          };
          if(selectedArr.length > 0){
            let isSame = false;
            if(!isSame){
              selectedArr.push(imgs);
            }else{
              $this.uploader.queue[i].remove();
            }
          }else{
            selectedArr.push(imgs);
          }
        }
    });
    this.imgCount = this.uploader.queue.length;
    this.selectedImageUrl = selectedArr;
  }

  // D: 定义事件，上传文件  单个文件
  uploadFile(num) {
    // 上传
    let that = this;
    this.uploader.queue.forEach((q,i)=> {
      if (!isUndefined(that.uploader.queue[i])) {
        that.uploader.queue[i].onSuccess = function (response, status, headers) {
          let tempRes = JSON.parse(response);
          // 上传文件成功
          if (status == 200) {
            // 上传文件后获取服务器返回的数据
            if(num == 1){
              that.path = tempRes['result'];
              that.imageAd = '';
            }else if(num == 2){
              that.path2 = tempRes['result'];
              that.imageHead = '';
            }
            alert("上传成功!");
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

  onCheckState(radio) {
    this.state = radio;
  }

  onCheckHerf(radio) {
    this.is_href = radio;
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
  getPostList(num:number){
    let url = 'getPostList?page='+num+'&sid='+this.cookieStore.getCookie('sid');
    if(this.checkTypeId != 0){
      url += '&type='+this.checkTypeId;
    }
    this.globalService.httpRequest('get',url)
      .subscribe((data)=>{
        this.postList = data;
        if(this.postList) {
          if (this.postList['status'] == 202) {
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
    this.getPostList(this.page);
  }
  /**
   * 添加文章
   */
  submitPost(){
    if(this.type == 0){
      alert('请填写选中分类！');
      return false;
    }else if(this.title.trim() == ''){
      alert('请填写标题！');
      return false;
    }else if(this.type == 8){
      if(this.theme.trim() == ''){
        alert('请填写主题！');
        return false;
      }else if(this.startDate.trim() == ''){
        alert('请填写开始时间！');
        return false;
      }else if(this.endDate.trim() == ''){
        alert('请填写结束时间！');
        return false;
      }
    }
    if(this.introduction.trim() == ''){
      alert('请填写简介！');
      return false;
    }
    this.globalService.httpRequest('post','editPost',{
      'post_id':this.editId,
      'title':this.title,
      'href':this.href,
      'tag':this.tag,
      'introduction':this.introduction,
      'description':this.description,
      'b_image_url':this.path,
      's_image_url':this.path2,
      'type':this.type,
      'state':this.state,
      'is_href':this.is_href,
      'theme':this.theme,
      'start_date':this.startDate,
      'end_date':this.endDate,
      'sid':this.cookieStore.getCookie('sid')
    }).subscribe( (data)=>{
        alert(data['msg']);
        if(data['status'] == 200){
          this.lgModal.hide();
          this.getPostList(1);
          this.clear();  //清除数据
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

  clear(){
    this.title = '';
    this.href = '';
    this.tag = '';
    this.introduction = '';
    this.type=0;
    this.state=1;
    this.is_href = 2;
    this.weight=0;
    this.theme = '';
    this.startDate = '';
    this.endDate = '';
    this.description = '';
    this.path = '';
    this.path2 = '';
  }

  /**
   * 筛选
   * @param num
   * @param name
   */
  checkType(num:number,name:string){
    this.checkTypeId = num;
    this.checkTypeName = name;
    this.getPostList(1);
  }

  /**
   * 修改时查询文章详情
   */
  getPostInfo(){
    if(this.editId == 0){
      alert('请在列表选中要操作的信息。');
      return false;
    }
    let url = 'getPostInfo?post_id='+this.editId+'&sid='+this.cookieStore.getCookie('sid');
    this.globalService.httpRequest('get',url)
      .subscribe((data)=>{
        this.setValue(data['result']);
        this.lgModal.show();
        this.postInfo = data;
        if(this.postInfo) {
          if (this.postInfo['status'] == 202) {
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }
        }
      });
  }

  setValue(info:any){
    this.title = info['title'];
    this.href = info['href'];
    this.tag = info['tag'];
    this.type = info['type'];
    this.state = info['state'];
    this.weight = info['weight'];
    this.is_href = info['is_href'];
    this.theme = info['theme'];
    this.startDate = info['start_date'];
    this.endDate = info['end_date'];
    this.introduction = info['introduction'];
    this.description = info['description'];

    this.imageAd = this.globalService.domain + info['b_image_url'];
    this.imageHead = this.globalService.domain + info['s_image_url'];
  }
  /**
   * 删除文章
   */
  deletePost(){
    if(this.editId == 0){
      alert('请在列表选中要操作的信息。');
      return false;
    }
    let msg = '您确定要执行此删除操作吗？';
    if(confirm(msg)) {
      let url ='deletePost?post_id=' + this.editId + '&sid=' + this.cookieStore.getCookie('sid');
      this.globalService.httpRequest('delete',url)
        .subscribe((data) => {
          if(data['status'] == 202){
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }else if(data['status'] == 200){
            this.getPostList(this.page);
          }

        });
    }
  }


  // //-----------------图片选择弹框 ---------------
  // showSelectFileDiv(){
  //   this.select_type = 'file';
  // }
  // getSelectTypes(){
  //   this.select_type = '';
  // }
  // getImgLists(value:any){
  //   this.imgList = JSON.parse(value);
  // }
  // /**
  //  * 上传文件
  //  */
  // postFile(num){
  //   var that = this;
  //   var form=document.forms[0];
  //   var formData : FormData = new FormData(form);
  //   //convertBase64UrlToBlob函数是将base64编码转换为Blob
  //   if(num == 1){
  //     formData.append("uploadedfile",this.globalService.convertBase64UrlToBlob(this.data1.image),"post_"+ new Date().getTime() +".png");
  //     console.log(this.data1);
  //   }else {
  //     formData.append("uploadedfile", this.globalService.convertBase64UrlToBlob(this.data2.image), "post_" + new Date().getTime() + ".png");
  //     console.log(this.data2);
  //   }
  //   //组建XMLHttpRequest 上传文件
  //   var infos ;
  //   var request = new XMLHttpRequest();
  //   //上传连接地址
  //   request.open("POST", this.globalService.getDomain() + "/api/v1/uploadFile");
  //   request.onreadystatechange=function()
  //   {
  //     console.log(request);
  //     if (request.readyState==4)
  //     {
  //       if(request.status==200){
  //         infos = JSON.parse(request.response);
  //         if(infos['status']==200){
  //           if(num == 1){
  //             that.path = infos['result'];
  //           }else {
  //             that.path2 = infos['result'];
  //           }
  //
  //           alert("上传成功");
  //         }else{
  //           alert("上传失败，无法获取图片上传地址");
  //         }
  //         console.log(that.path);
  //         console.log(that.path2);
  //       }else{
  //         alert("上传失败,检查上传地址是否正确");
  //       }
  //     }
  //   }
  //   request.send(formData);
  // }


  @ViewChild('lgModal', { static: true }) public lgModal:ModalDirective;
}
