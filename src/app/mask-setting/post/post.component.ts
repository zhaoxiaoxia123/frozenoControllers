import { Component, OnInit, ViewChild} from '@angular/core';
import {FadeInTop} from '../../shared/animations/fade-in-top.decorator';
import {CookieStoreService} from '../../shared/cookies/cookie-store.service';
import {Router} from '@angular/router';
import {GlobalService} from '../../core/global.service';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

@FadeInTop()
@Component({
  selector: 'app-post',
  styleUrls: ['./post.css'],
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  title:string;
  href:string;
  tag:string;
  introduction:string;
  type:number=0;
  state:number;
  theme:string;
  startDate:string;
  endDate:string;
  description:string;

  name:string;
  data1:any;
  avatarSettings:CropperSettings;

  name2:string;
  data2:any;
  avatarSettings2:CropperSettings;

  croppedWidth:number;
  croppedHeight:number;

  typeList:any = [];
  url : string = this.globalService.getDomain();
  path:string = '';
  path2:string = '';
  /**菜单id */
  menu_id:any;
  /** 权限 */
  permissions : Array<any> = [];
  menuInfos : any = [];

  rollback_url :string = '';
  @ViewChild('avatarCropper', /* TODO: add static flag */ undefined) avatarCropper:ImageCropperComponent;
  @ViewChild('avatarCropper2', /* TODO: add static flag */ undefined) avatarCropper2:ImageCropperComponent;

  constructor(
      private router : Router,
      private cookieStore:CookieStoreService,
      private globalService:GlobalService,
      // private sanitizer: DomSanitizer
  ) {
    window.scrollTo(0,0);
    this.typeList = [{'id':1,'name':'帮助与客服'},
      {'id':2,'name':'成长课堂'},
      {'id':3,'name':'产品百科'},
      {'id':4,'name':'规则中心'},
      {'id':5,'name':'政策中心'},
      {'id':6,'name':'系统通知'},
      {'id':7,'name':'冻龄智美通知'},
      {'id':8,'name':'激励中心'},
    ];

    this.name = 'Angular2';
    this.avatarSettings = new CropperSettings();
    this.avatarSettings.width = 200;
    this.avatarSettings.height = 200;
    this.avatarSettings.croppedWidth = 200;
    this.avatarSettings.croppedHeight = 200;
    this.avatarSettings.canvasWidth = 300;
    this.avatarSettings.canvasHeight = 300;
    this.avatarSettings.minWidth = 10;
    this.avatarSettings.minHeight = 10;
    this.avatarSettings.rounded = false;
    this.avatarSettings.keepAspect = true;
    this.avatarSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.avatarSettings.cropperDrawSettings.strokeWidth = 2;
    this.data1 = {};

    this.name2 = 'Angular2';
    this.avatarSettings2 = new CropperSettings();
    this.avatarSettings2.width = 200;
    this.avatarSettings2.height = 200;
    this.avatarSettings2.croppedWidth = 200;
    this.avatarSettings2.croppedHeight = 200;
    this.avatarSettings2.canvasWidth = 300;
    this.avatarSettings2.canvasHeight = 300;
    this.avatarSettings2.minWidth = 10;
    this.avatarSettings2.minHeight = 10;
    this.avatarSettings2.rounded = false;
    this.avatarSettings2.keepAspect = true;
    this.avatarSettings2.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.avatarSettings2.cropperDrawSettings.strokeWidth = 2;
    this.data2 = {};
  }

  cropped(bounds:Bounds) {
    this.croppedHeight =bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
  }
  ngOnInit() {

  }

  // onCheck(radio) {
  //   this.type = radio;
  // }
  onCheckState(radio) {
    this.state = radio;
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
      'title':this.title,
      'href':this.href,
      'tag':this.tag,
      'introduction':this.introduction,
      'description':this.description,
      'b_image_url':this.path,
      's_image_url':this.path2,
      'type':this.type,
      'state':this.state,
      'theme':this.theme,
      'start_date':this.startDate,
      'end_date':this.endDate,
      'sid':this.cookieStore.getCookie('sid')
    }).subscribe( (data)=>{
        alert(data['msg']);
        if(data['status'] == 200){
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
  /**
   * 上传文件
   */
  postFile(num){
    var that = this;
    var form=document.forms[0];
    var formData : FormData = new FormData(form);
    //convertBase64UrlToBlob函数是将base64编码转换为Blob
    if(num == 1){
      formData.append("uploadedfile",this.globalService.convertBase64UrlToBlob(this.data1.image),"post_"+ new Date().getTime() +".png");
      console.log(this.data1);
    }else {
      formData.append("uploadedfile", this.globalService.convertBase64UrlToBlob(this.data2.image), "post_" + new Date().getTime() + ".png");
      console.log(this.data2);
    }
    //组建XMLHttpRequest 上传文件
    var infos ;
    var request = new XMLHttpRequest();
    //上传连接地址
    request.open("POST", this.globalService.getDomain() + "/api/v1/uploadFile");
    request.onreadystatechange=function()
    {
      console.log(request);
      if (request.readyState==4)
      {
        if(request.status==200){
          infos = JSON.parse(request.response);
          if(infos['status']==200){
            if(num == 1){
              that.path = infos['result'];
            }else {
              that.path2 = infos['result'];
            }

            alert("上传成功");
          }else{
            alert("上传失败，无法获取图片上传地址");
          }
          console.log(that.path);
          console.log(that.path2);
        }else{
          alert("上传失败,检查上传地址是否正确");
        }
      }
    }
    request.send(formData);
  }


}
