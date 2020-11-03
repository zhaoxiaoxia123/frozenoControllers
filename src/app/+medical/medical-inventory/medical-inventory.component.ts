import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {GlobalService} from "../../core/global.service";

@Component({
  selector: 'app-medical-inventory',
  templateUrl: './medical-inventory.component.html',
})
export class MedicalInventoryComponent implements OnInit {
  page : any;
  prev : boolean = false;
  next : boolean = false;

  assetsList : any = [];
  userList : any = [];
  assetsInfo : any = [];
  //用作全选和反选
  selects : Array<any> = [];
  check : boolean = false;

  //默认值
  assets_id:number = 0;
  assets_name: string = '';
  assets_number: string = '';
  assets_param: string = '';
  category_type_ids: string = '';//资产分类id
  category_type_name: string = ''; //资产分类名称
  assets_count: string = '';
  assets_unit: string = '';
  assets_price: string = '';
  assets_buy_date: string = '';
  assets_status: number = 1;
  assets_check_address : string = '';
  assets_department_id : number = 0;
  assets_user_id : number = 0;
  assets_note : string = '';

  //顶部启动 和无效是否启用显示
  editStatusAssetsId : any = 0;
  isStatus : any = 0;
  //处理批量
  isAll : number = 0;
  width : string = '0%';
  width_1 : string = '90%';
  isDetail : string = '';

  page_type : any = 'medical';
  //用作全选和反选
  selectIds : Array<any> = [];
  checkId : boolean = false;

  keyword : string = '';
  cid : any = 0;//当前登录用户的所属公司id
  super_admin_id : any = 0;//超级管理员所属公司id
  category_type : number = 6; //资产类别  -》 医疗管理的类别用的是商品类别
  rollback_url : string = '';
  /**菜单id */
  menu_id:any;
  /** 权限 */
  permissions : Array<any> = [];
  menuInfos : any = [];
  constructor(
      private router : Router,
      private cookieStore:CookieStoreService,
      private globalService:GlobalService) {
    window.scrollTo(0,0);
    this.super_admin_id = this.globalService.getAdminID();
    this.cid = this.cookieStore.getCookie('cid');
    this.getAssetsList('1');
  }

  ngOnInit() {

    //顶部菜单读取
    this.globalService.getMenuInfo();
    setTimeout(()=>{
      this.menu_id = this.globalService.getMenuId();
      this.rollback_url = this.globalService.getMenuUrl();
      this.permissions = this.globalService.getPermissions();
      this.menuInfos = this.globalService.getMenuInfos();
    },this.globalService.getMenuPermissionDelayTime())
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

  /**
   * 获取产品列表
   * @param number
   */
  getAssetsList(number:string) {
    let url = 'getAssetsOrder?page_type='+this.page_type+'&page='+number+'&sid='+this.cookieStore.getCookie('sid');
    if(this.keyword.trim() != '') {
      url += '&keyword='+this.keyword.trim();
    }
    this.globalService.httpRequest('get',url)
        .subscribe((data)=>{
          this.assetsList = data;
          if(this.assetsList['status'] == 202){
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }
          if(this.assetsList.length > 0){
            if (this.assetsList['result']['assetsList']['current_page'] == this.assetsList['result']['assetsList']['last_page']) {
              this.next = true;
            } else {
              this.next = false;
            }
            if (this.assetsList['result']['assetsList']['current_page'] == 1) {
              this.prev = true;
            } else {
              this.prev = false;
            }
            this.selects = [];
            for (let entry of this.assetsList['result']['assetsList']['data']) {
              this.selects[entry['assets_id']] = false;
            }
            this.check = false;
          }
        });
  }

  /**
   * 页码分页
   * @param page
   */
  pagination(page : any) {
    this.page = page;
    this.getAssetsList(this.page);
  }

  //全选，反全选
  changeCheckAll(e){
    let t = e.target;
    let c = t.checked;
    this.selects.forEach((val, idx, array) => {
      this.selects[idx] = c;
    });
    this.check = c;
  }

  //点击列表checkbox事件
  handle(e){
    let t = e.target;
    let v = t.value;
    let c = t.checked;
    this.selects[v] = c;
    let isAll = 0;
    for (let s of this.selects) {
      if(s == false) {
        isAll += 1;
      }
    }
    if(isAll >= 1){
      this.check = false;
    }else{
      this.check = true;
    }
  }

  /**
   * 添加信息
   */
  onSubmit(num:number){
    if(this.assets_number.trim() == ''){
      alert('请输入编号！');
      return false;
    }
    if(this.assets_name.trim() == ''){
      alert('请输入名称！');
      return false;
    }
    this.globalService.httpRequest('post','addAssets',{
      'assets_id' : this.assets_id,
      'assets_name' : this.assets_name,
      'assets_number' : this.assets_number,
      'assets_count' : this.assets_count,
      'assets_unit' : this.assets_unit,
      'assets_buy_date' : this.assets_buy_date,
      'assets_note' : this.assets_note,
      'page_type':'medical',
      'u_id' : this.cookieStore.getCookie('uid'),
      'sid':this.cookieStore.getCookie('sid')
    }).subscribe((data)=>{
          if(data['status'] == 201){
            alert(data['msg']);
            return false;
          }else if(data['status'] == 200) {
            this.assetsList = data;
            if(this.assetsList){
              if (this.assetsList['result']['assetsList']['current_page'] == this.assetsList['result']['assetsList']['last_page']) {
                this.next = true;
              } else {
                this.next = false;
              }
              if (this.assetsList['result']['assetsList']['current_page'] == 1) {
                this.prev = true;
              } else {
                this.prev = false;
              }
              this.selects = [];
              for (let entry of this.assetsList['result']['assetsList']['data']) {
                this.selects[entry['assets_id']] = false;
              }
              this.check = false;
            }
            this.clear_('');
            if(num == 1) {
              this.addModal.hide();
            }
          }else if(data['status'] == 202){
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }
        }
    );
  }


  /**
   * 重置
   */
  clear_(type:string=''){
    this.assets_id = 0;
    this.assets_name = '';
    this.assets_number = '';
    this.assets_count = '';
    this.assets_unit = '';
    this.assets_buy_date = '';
    this.assets_status = 1;
    this.assets_note = '';
    this.selectIds=[];
    if(type == 'detail'){
      this.detailModal.hide();
    }else {
      this.addModal.hide();
    }
  }

  /**
   * 复制
   */
  setValue(info:Array<any>){
    this.assets_id = info['result']['assets_id'];
    this.assets_name = info['result']['assets_name'];
    this.assets_number = info['result']['assets_number'];
    this.category_type_ids = info['result']['category_type_ids'];
    this.assets_count = info['result']['assets_count'];
    this.assets_unit = info['result']['assets_unit'];
    this.assets_buy_date = info['result']['assets_buy_date'];
    this.assets_note = info['result']['assets_note'];
    this.selectIds = [];
    let selectIds_ = info['result']['selectIds'];
    this.category_type_name = '';
    for (let entry of info['result']['category']) {
        this.selectIds[entry['category_id']] = true;
        this.category_type_name += entry['category_desc'] + ',';
    }
    this.checkId = false;
  }

  /**
   *  type ： （ edit ：修改  ；  detail  ： 详情）
   */
  detailAssets(type:string){
    if(this.isStatus == 0){
      return false;
    }
    this.isDetail = type;
    this.globalService.httpRequest('get','getAssetsInfo?type='+type+'&assets_id='+this.editStatusAssetsId+'&sid='+this.cookieStore.getCookie('sid'))
        .subscribe((data)=>{
          this.assetsInfo = data;
          if(this.assetsInfo['status'] == 200) {
            this.setValue(this.assetsInfo);
            if(type == 'detail'){
              this.detailModal.show();
            }else{
              this.addModal.show();
            }
          }else if(this.assetsInfo['status'] == 202){
            alert(this.assetsInfo['msg']);
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }
        });
  }

  /**
   * 顶部  启用. 无效
   */
  isStatusShow(u_id:any,status:any){
    this.editStatusAssetsId = u_id;
    this.isStatus = status;

    this.isAll = 0;
    this.width = '0%';
    this.width_1 ='90%';
    this.selects.forEach((val, idx, array) => {
      if(val == true){
        this.selects[idx] = false;
      }
    });
  }

  /**
   * 批量
   */
  showAllCheck() {
    if(this.isAll == 0) {
      this.isAll = 1;
      this.editStatusAssetsId = 0;
      this.isStatus = 0;
      this.width = '10%';
      this.width_1 = '80%';
    }
  }


  /**
   * 删除信息
   * type id:单挑  all :多条
   */
  deleteAssets(type:any){
    if(this.globalService.demoAlert('','')){
      return false;
    }
    let msg = '';
    let assets_id : string = '';
    if(type == 'id'){
      assets_id = this.editStatusAssetsId;
    } else if(type == 'all') {
      let is_select = 0;
      this.selects.forEach((val, idx, array) => {
        if (val == true) {
          assets_id += idx + ',';
          is_select += 1;
        }
      });
      if (is_select < 1) {
        msg = '请确认已选中需要删除的信息！';
        alert(msg);
        return false;
      }
    }
    msg = '执行删除会连同此库存的商品信息一并删除，您确定要执行此删除操作吗？';
    if(confirm(msg)) {
      let url = 'deleteAssetsById?assets_id=' + assets_id + '&page_type=order&control_type='+this.page_type+'&type='+type+'&sid=' + this.cookieStore.getCookie('sid');
      this.globalService.httpRequest('delete',url)
          .subscribe((data) => {
            this.assetsList = data;
            if(this.assetsList['status'] == 202){
              this.cookieStore.removeAll(this.rollback_url);
              this.router.navigate(['/auth/login']);
            }
            if(this.assetsList){
              if (this.assetsList['result']['assetsList']['current_page'] == this.assetsList['result']['assetsList']['last_page']) {
                this.next = true;
              } else {
                this.next = false;
              }
              if (this.assetsList['result']['assetsList']['current_page'] == 1) {
                this.prev = true;
              } else {
                this.prev = false;
              }
              this.selects = [];
              for (let entry of this.assetsList['result']['assetsList']['data']) {
                this.selects[entry['assets_id']] = false;
              }
              this.check = false;
            }
          });
    }
  }

  @ViewChild('addModal', { static: true }) public addModal:ModalDirective;
  @ViewChild('detailModal', { static: true }) public detailModal:ModalDirective;
}
