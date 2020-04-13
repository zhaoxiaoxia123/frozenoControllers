import {Component, OnInit, ViewChild} from '@angular/core';
import {CookieStoreService} from '../../../shared/cookies/cookie-store.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {mobileAsyncValidator, mobileValidator} from '../../../shared/common/validator';
import {getProvince,getCity,getArea} from '../../../shared/common/area';
import {Router,ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../core/global.service';
import {FadeInTop} from '../../../shared/animations/fade-in-top.decorator';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import {NotificationService} from "../../../shared/utils/notification.service";

@FadeInTop()
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.scss'],
})
export class RegistrationFormComponent implements OnInit {
  formModel : FormGroup;
  //家庭地址
  province : string[] = [];
  city : string[] = [];
  area : string[] = [];
  //籍贯
  birthplace_province : string[] = [];
  birthplace_city : string[] = [];
  passwordPlaceholder:string = '请输入密码';
  userList : any = [];

  u_id : number = 0;
  user_info : any = [];

  super_admin_id : any = 0;//超级管理员id
  is_show : boolean = false;

  is_showDiv : boolean = false;//展开收起
  role_default : number;
  gender_default : number;
  c_id_default : number;
  department_default : any = '0';
  title_default: number = 0;
  contract_type_default : number;
  birthplace1_default : number;
  birthplace2_default : number;
  nation_default : string;
  marital_status_default : number;
  study_diploma_default : number;
  study_category_default : number;
  address1_default : number;
  address2_default : number;
  address3_default : number;

  url : string = this.globalService.getDomain();
  path:string = '';

  datePickerConfig = {
    locale: 'zh-CN',
    format:'YYYY-MM-DD',
    enableMonthSelector:true,
    showMultipleYearsNavigation:true,
  };

  name:string;
  data1:any;
  avatarSettings:CropperSettings;
  croppedWidth:number;
  croppedHeight:number;

  /**菜单id */
  menu_id:any;
  /** 权限 */
  permissions : Array<any> = [];

  rollback_url :string = '';
  @ViewChild('avatarCropper', /* TODO: add static flag */ undefined) avatarCropper:ImageCropperComponent;
  constructor(
      fb:FormBuilder,
      private router : Router,
      private cookieStore:CookieStoreService,
      private routInfo : ActivatedRoute,
      private globalService:GlobalService,
      private notificationService: NotificationService
  ) {
    
    this.formModel = fb.group({
      u_id:[''],
      employee_id:['',[Validators.required,Validators.minLength(1)]],
      name:['',[Validators.required,Validators.minLength(1)]],
      role:[''],
      gender:[''],
      age:[''],
      password:['',[Validators.minLength(6)]],
      phone:['',mobileValidator,mobileAsyncValidator],
      department:[''],
      title:[''],
      notes:[''],
      enrol_time:[''],
      position:[''],
      contract_type:[''],
      birthplace1:[''],
      birthplace2:[''],
      id_card:[''],
      nation:[''],
      marital_status:[''],
      graduate_institutions:[''],
      study_major:[''],
      study_diploma:[''],
      study_category:[''],
      email:[''],
      emergency_contact:[''],
      emergency_phone:[''],
      u_emergency_address:[''],
      u_zip_code:[''],
      u_home_phone:[''],
      u_shortcode:[''],
      u_birthday:[''],
      address1:[''],
      address2:[''],
      address3:[''],
      address4:[''],
      updated_at:[''],
      created_at:[''],
      c_id:['']
    });

    this.province = getProvince(); //家庭住址
    this.birthplace_province = getProvince();  //籍贯

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
  }

  cropped(bounds:Bounds) {
    this.croppedHeight =bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
  }
  ngOnInit() {
    this.u_id = this.routInfo.snapshot.params['u_id'];
    if(this.u_id != 0){
      this.getUserInfo(this.u_id);
      this.rollback_url += '/' + this.u_id;
    }else{
      this.rollback_url += '/0';
    }
    this.getUserDefault(1);

    //顶部菜单读取
    this.globalService.getMenuInfo();
    setTimeout(()=>{
      this.menu_id = this.globalService.getMenuId();
      this.rollback_url = this.globalService.getMenuUrl();
      this.permissions = this.globalService.getPermissions();
    },this.globalService.getMenuPermissionDelayTime())
  }

  /**
   * header  测试测试
   */
  go(){
    let token = localStorage.getItem('access_token');
    let options = {
      'Accept':'application/json',
    'Authorization':'Bearer ' +token
    };

    let body = JSON.stringify({});
    this.globalService.httpRequest('post','details', body, options)
        .subscribe((data)=>{
      let info = JSON.parse(data['_body']);
      console.log(info);
    },
    response => {
      console.log('PATCH call in error', response);
    });
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

  showPinyin(){
    let name = this.formModel.value['name'];
    if(name.trim() != ''){
      this.globalService.httpRequest('get','getPinyin?name='+name)
          .subscribe((data)=>{
            this.formModel.patchValue({
              'u_shortcode': data['result']
            });
          });
    }
  }

  getUserInfo(u_id:number){
    this.globalService.httpRequest('get','getUserInfo?u_id='+u_id)
        .subscribe((data)=>{
          this.user_info = data;
          console.log(this.user_info);
          this.setValue();
        });
  }

  setValue(){
    this.formModel.patchValue({
      'u_id':this.user_info['result']['id'],
      'employee_id':this.user_info['result']['name'],
      'name':this.user_info['result']['u_username'],
      'phone':this.user_info['result']['u_phone'],
      'role':this.user_info['result']['u_role'],
      'gender':this.user_info['result']['u_gender'],
      'age':this.user_info['result']['u_age'],
      'department':this.user_info['result']['u_department'],
      'title':this.user_info['result']['u_title'],
      'notes':this.user_info['result']['u_notes'],
      'enrol_time':this.user_info['result']['u_enrol_time'],
      'position':this.user_info['result']['u_position'],
      'contract_type':this.user_info['result']['u_contract_type'],
      'birthplace1':this.user_info['result']['birthplace1'],
      'birthplace2':this.user_info['result']['birthplace2'],
      'id_card':this.user_info['result']['u_id_card'],
      'nation':this.user_info['result']['u_nation'],
      'marital_status':this.user_info['result']['u_marital_status'],
      'graduate_institutions':this.user_info['result']['u_graduate_institutions'],
      'study_major':this.user_info['result']['u_study_major'],
      'study_diploma':this.user_info['result']['u_study_diploma'],
      'study_category':this.user_info['result']['u_study_category'],
      'email':this.user_info['result']['email'],
      'emergency_contact':this.user_info['result']['u_emergency_contact'],
      'emergency_phone':this.user_info['result']['u_emergency_phone'],
      'u_emergency_address':this.user_info['result']['u_emergency_address'],
      'u_zip_code':this.user_info['result']['u_zip_code'],
      'u_home_phone':this.user_info['result']['u_home_phone'],
      'u_shortcode':this.user_info['result']['u_shortcode'],
      'u_birthday':this.user_info['result']['u_birthday'],
      'address1':this.user_info['result']['address1'],
      'address2':this.user_info['result']['address2'],
      'address3':this.user_info['result']['address3'],
      'address4':this.user_info['result']['address4'],
      'updated_at':this.user_info['result']['updated_at'],
      'created_at':this.user_info['result']['created_at'],
    });
    this.path = this.user_info['result']['u_avatar'];
    if(this.user_info['result']['birthplace1'] != 0){
      this.getBrithplaceCity();
    }
    if(this.user_info['result']['address1'] != 0){
      this.getCity();
    }
    if(this.user_info['result']['address2'] != 0){
      this.getArea();
    }
    this.super_admin_id = this.user_info['super_admin_id'];
    if(this.cookieStore.getCookie('cid') == this.super_admin_id){
      this.formModel.patchValue({
        'c_id': this.user_info['result']['c_id']
      });
      this.is_show = true;
    }
    this.passwordPlaceholder = '******';
  }

  clear_(){
    this.formModel.patchValue({
      'u_id':'',
      'employee_id':'',
      'name':'',
      'phone':'',
      'role':'',
      'gender':'',
      'age':'',
      'department':'',
      'title':'',
      'notes':'',
      'enrol_time':'',
      'position':'',
      'contract_type':'',
      'birthplace1':'',
      'birthplace2':'',
      'id_card':'',
      'nation':'',
      'marital_status':'',
      'graduate_institutions':'',
      'study_major':'',
      'study_diploma':'',
      'study_category':'',
      'email':'',
      'emergency_contact':'',
      'emergency_phone':'',
      'u_emergency_address':'',
      'u_zip_code':'',
      'u_home_phone':'',
      'u_shortcode':'',
      'u_birthday':'',
      'address1':'',
      'address2':'',
      'address3':'',
      'address4':'',
      'updated_at':'',
      'created_at':'',
      'c_id':'',
      'password':''
    });
    this.path = '';

    this.role_default = 0;
    this.gender_default  = 0;
    this.c_id_default = 0;
    this.department_default  = '0';
    this.title_default = 0;
    this.contract_type_default  = 0;
    this.birthplace1_default = 0;
    this.birthplace2_default = 0;
    this.nation_default = '';
    this.marital_status_default  = 0;
    this.study_diploma_default = 0;
    this.study_category_default = 0;
    this.address1_default = 0;
    this.address2_default = 0;
    this.address3_default = 0;
    this.passwordPlaceholder = '';
  }
  /**
   * 展开收起
   */
  changeDivStatus(){
    this.is_showDiv = (this.is_showDiv == false) ? true : false;
  }

  /**
   * 获取添加员工的默认参数
   */
  getUserDefault(num:number) {
    this.globalService.httpRequest('get','getUserDefault?type=add&sid='+this.cookieStore.getCookie('sid'))
        .subscribe((data)=>{
          this.userList = data;
          if(this.userList['status'] == 202) {
            alert(this.userList['msg']);
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }
          if(this.u_id == 0){
            this.role_default = 2;
            this.gender_default = 1;
            this.c_id_default = this.userList['result']['customerList'].length >= 1 ? this.userList['result']['customerList'][0]['c_id'] : 0;
            this.department_default = '0';//this.userList['result']['departmentList'].length >= 1 ? this.userList['result']['departmentList'][0]['department_id'] : 0;
            this.title_default = this.userList['result']['titleList'].length >= 1 ? this.userList['result']['titleList'][0]['category_id'] : 0;

            this.contract_type_default = this.userList['result']['contractTypeList'].length >= 1 ? this.userList['result']['contractTypeList'][0]['category_id'] : 0;
            this.birthplace1_default = 0;
            this.birthplace2_default = 0;
            this.nation_default = '汉族';
            this.marital_status_default = 1;
            this.study_diploma_default = 1;
            this.study_category_default = this.userList['result']['studyCategoryList'].length >= 1 ? this.userList['result']['studyCategoryList'][0]['category_id'] : 0;
            this.address1_default = 0;
            this.address2_default = 0;
            this.address3_default = 0;
            this.super_admin_id = this.userList['super_admin_id'];
          }
          if(this.cookieStore.getCookie('cid') == this.super_admin_id){
            this.is_show = true;
          }
        });
  }

  onSubmit(num:number){
    if(this.formModel.value['employee_id'].trim() == ''){
      alert('请填写员工编号！');
      return false;
    }
    if(this.formModel.value['name'].trim() == ''){
      alert('请填写员工姓名！');
      return false;
    }
    this.globalService.httpRequest('post','addUser',{
      'u_id':this.formModel.value['u_id'],
      'employee_id':this.formModel.value['employee_id'],
      'name':this.formModel.value['name'],
      'phone':this.formModel.value['phone'],
      'password':this.formModel.value['password'],
      'role':this.formModel.value['role'],
      'gender':this.formModel.value['gender'],
      'age':this.formModel.value['age'],
      'department':this.formModel.value['department'],
      'title':this.formModel.value['title'],
      'notes':this.formModel.value['notes'],
      'enrol_time':this.formModel.value['enrol_time'],
      'position':this.formModel.value['position'],
      'contract_type':this.formModel.value['contract_type'],
      'birthplace':this.formModel.value['birthplace1']+ ','+this.formModel.value['birthplace2'],
      'id_card':this.formModel.value['id_card'],
      'nation':this.formModel.value['nation'],
      'marital_status':this.formModel.value['marital_status'],
      'graduate_institutions':this.formModel.value['graduate_institutions'],
      'study_major':this.formModel.value['study_major'],
      'study_diploma':this.formModel.value['study_diploma'],
      'study_category':this.formModel.value['study_category'],
      'email':this.formModel.value['email'],
      'emergency_contact':this.formModel.value['emergency_contact'],
      'emergency_phone':this.formModel.value['emergency_phone'],
      'u_emergency_address':this.formModel.value['u_emergency_address'],
      'u_zip_code':this.formModel.value['u_zip_code'],
      'u_home_phone':this.formModel.value['u_home_phone'],
      'u_shortcode':this.formModel.value['u_shortcode'],
      'u_birthday':this.formModel.value['u_birthday'],
      'address':this.formModel.value['address1']+','+this.formModel.value['address2'] +','+ this.formModel.value['address3']+','+this.formModel.value['address4'],
      'sid':this.cookieStore.getCookie('sid'),
      'c_id':this.formModel.value['c_id'],
      'avatar':this.path
    }).subscribe( (data)=>{
          alert(data['msg']);
          if(data['status'] == 200) {
            if(num == 1) {
              this.cookieStore.setCookie('u_avatar', this.path);
              this.router.navigateByUrl('/tables/staff');
            }else{
              this.clear_();
            }
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

  getCity(){
    let pro = this.formModel.value['address1'];
    this.city = getCity(pro);
    this.area = [];
  }
  getArea(){
    let pro = this.formModel.value['address1'];
    let city = this.formModel.value['address2'];
    this.area = getArea(pro,city);
    // console.log(this.area);
  }
  getBrithplaceCity(){
    let brithplacePro = this.formModel.value['birthplace1'];
    this.birthplace_city = getCity(brithplacePro);
  }

  /**
   * 上传文件
   */
  postFile(){
    var that = this;
    var form=document.forms[0];
    var formData : FormData = new FormData(form);
    //convertBase64UrlToBlob函数是将base64编码转换为Blob
    formData.append("uploadedfile",this.globalService.convertBase64UrlToBlob(this.data1.image),"head_"+ new Date().getTime() +".png");
    console.log(this.data1);
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
            that.path = infos['result'];
            alert("上传成功");
          }else{
            alert("上传失败，无法获取图片上传地址");
          }
          console.log(that.path);
        }else{
          alert("上传失败,检查上传地址是否正确");
        }
      }
    }
    request.send(formData);
  }


    //添加按钮
    smartModEg1() {
        this.notificationService.smartMessageBox({
            title: "添加",
            content: "请在新页面添加选项，添加完成后在当前页面点击<i class='fa fa-link'></i>刷新按钮继续选择（注：刷新按钮只是局部刷新）",
            buttons: '[取消][确定]'
        }, (ButtonPressed) => {
            if (ButtonPressed === "Yes") {
            }
        });
    }
}
