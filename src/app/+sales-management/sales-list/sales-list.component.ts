import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {GlobalService} from "../../core/global.service";

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
})
export class SalesListComponent implements OnInit {
  purchaseList : any = [];
  purchaseInfo : any = [];
  page : any;
  prev : boolean = false;
  next : boolean = false;
  //用作全选和反选
  selects : Array<any> = [];
  check : boolean = false;

  //顶部启动 和无效是否启用显示
  editStatusPurchaseId : any = 0;
  isStatus : any = 0;
  //处理批量
  isAll : number = 0;
  width : string = '0%';
  width_1 : string = '70%';

  type : number = 4;
  keyword:string = '';
  rollback_url : string = '';

  /**
   * 用作审核的变量
   */
  uid : any = '';//当前登录用户id
  pr_status : any = '';//当前选中的状态值
  pr_u_id : any = '';//当前选中的创建者id
  pr_u_username: any = '';//当前选中的创建者昵称
  pr_order: any = '';//当前选中的单据号

  operate_type : string = '';//操作弹框类型
  operate_button_type : string = '';//操作按钮类型
  operate_button_type_is_more : string = '';//是否是批量操作
  select_count : any = '';//批量选中的操作条数
  operate_types : string = '';//操作弹框类型
  log_type:string = 'purchase_sale';
  log_table_name:string = 'purchase';
  /**菜单id */
  menu_id:any;
  /** 权限 */
  permissions : Array<any> = [];
  menuInfos : any = [];
  constructor(
      private router : Router,
      private cookieStore:CookieStoreService,
      private globalService:GlobalService) {
    this.uid = this.cookieStore.getCookie('uid');
    this.getPurchaseList('1');
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
   * 获取列表
   * @param number
   */
  getPurchaseList(number:string) {
    let url = 'getPurchaseList?pr_type='+this.type+'&page='+number+'&sid='+this.cookieStore.getCookie('sid');
    if(this.keyword.trim() != '') {
      url += '&keyword='+this.keyword.trim();
    }
    this.globalService.httpRequest('get',url)
        .subscribe((data)=>{
          this.purchaseList = data;
          if(this.purchaseList['status'] == 202){
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }
          if (this.purchaseList) {
            if (this.purchaseList['result']['purchaseList']['current_page'] == this.purchaseList['result']['purchaseList']['last_page']) {
              this.next = true;
            } else {
              this.next = false;
            }
            if (this.purchaseList['result']['purchaseList']['current_page'] == 1) {
              this.prev = true;
            } else {
              this.prev = false;
            }
            this.selects = [];
            for (let entry of this.purchaseList['result']['purchaseList']['data']) {
              this.selects[entry['pr_id']] = false;
            }
            this.check = false;
          }
        });

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
   * 删除选中进货单
   * type   id:单选删除  all：复选删除
   * @returns {boolean}
   */
  deletePurchase(type:any){
    if(this.globalService.demoAlert('','')){
      return false;
    }
    let msg = '';
    let pr_id : string = '';
    if(type == 'id'){
      pr_id = this.editStatusPurchaseId;
    } else if(type == 'all') {
      let is_select = 0;
      this.selects.forEach((val, idx, array) => {
        if (val == true) {
          pr_id += idx + ',';
          is_select += 1;
        }
      });
      if(is_select < 1){
        msg = '请确认已选中需要删除的信息！';
        alert(msg);
        return false;
      }
    }
    msg = '您确定要删除该信息吗？';
    if(confirm(msg)) {
      let url = 'deletePurchaseById?pr_id=' + pr_id + '&type='+type+'&pr_type='+this.type+'&sid=' + this.cookieStore.getCookie('sid');
      this.globalService.httpRequest('delete',url)
          .subscribe((data) => {
            this.purchaseList = data;
            if(this.purchaseList['status'] == 202){
              this.cookieStore.removeAll(this.rollback_url);
              this.router.navigate(['/auth/login']);
            }
            this.selects = [];
            for (let entry of this.purchaseList['result']['purchaseList']['data']) {
              this.selects[entry['pr_id']] = false;
            }
            this.check = false;
            if (this.purchaseList) {
              if (this.purchaseList['result']['purchaseList']['current_page'] == this.purchaseList['result']['purchaseList']['last_page']) {
                this.next = true;
              } else {
                this.next = false;
              }
              if (this.purchaseList['result']['purchaseList']['current_page'] == 1) {
                this.prev = true;
              } else {
                this.prev = false;
              }
            }
          });
    }
  }
  /**
   * 演示账号输出
   * @param url
   * @param param
   * type   edit   detail
   */
  isDemo(url:string,param:any,type:any){
    if(param == '1'){
      param = this.editStatusPurchaseId;
      if(type == 'detail') {
        param = param + '_' + type;
      }
    }
    this.globalService.demoAlert(url,param);
  }
  /**
   * 页码分页
   * @param page
   */
  pagination(page : any) {
    this.page = page;
    this.getPurchaseList(this.page);
  }

  /**
   * 顶部  启用. 无效
   */
  isStatusShow(pr_id:any,status:any,u_id:any,u_username:string,pr_order:string){
    this.editStatusPurchaseId = pr_id;
    this.isStatus = status;

    this.pr_u_id = u_id;
    this.pr_status = status;
    this.pr_u_username = u_username;
    this.pr_order = pr_order;

    this.isAll = 0;
    this.width = '0%';
    this.width_1 ='70%';
    this.selects.forEach((val, idx, array) => {
      if(val == true){
        this.selects[idx] = false;
      }
    });
  }
  /**
   * 修改状态
   * @param status
   * type   all 批量   id  单条操作
   */
  editStatus(status:any,type:any){
    let pr_id = '';
    if(type == 'all'){
      this.selects.forEach((val, idx, array) => {
        if(val == true){
          pr_id += idx+',';
        }
      });
    }else{
      pr_id = this.editStatusPurchaseId;
    }

    if(! pr_id){
      alert('请确保已选中需要操作的项！');
      return false;
    }
    this.globalService.httpRequest('post','addPurchase',{
      'pr_id':pr_id,
      'pr_status':status,
      'type':type,
      'pr_type':this.type,
      'keyword':this.keyword.trim(),
      'sid':this.cookieStore.getCookie('sid')
    }).subscribe((data)=>{
        alert(data['msg']);
        if(data['status'] == 200) {
          this.purchaseList = data;

          this.selects = [];
          for (let entry of this.purchaseList['result']['purchaseList']['data']) {
            this.selects[entry['pr_id']] = false;
          }
          this.check = false;
        }else if(data['status'] == 202){
          this.cookieStore.removeAll(this.rollback_url);
          this.router.navigate(['/auth/login']);
        }
        this.editStatusPurchaseId = 0;
        this.isStatus = 0;
      });
  }

  /**
   * 批量
   */
  showAllCheck() {
    if(this.isAll == 0) {
      this.isAll = 1;
      this.editStatusPurchaseId = 0;
      this.isStatus = 0;
      this.width = '5%';
      this.width_1 = '65%';
    }
  }


  //-----------审核按钮操作-------
  /**
   * 显示操作弹出框
   * @param type
   * is_more （all 表示多选操作）
   */
  public showModal(type:string,type1:string,is_more:string): void {
    this.operate_type = type;
    this.operate_button_type = type1;
    this.operate_button_type_is_more = is_more;
    let s  = [];
    let is_select = 0;
    this.selects.forEach((val, idx, array) => {
      if (val == true) {
        s[idx] = val;
        is_select += 1;
      }
    });
    this.selects = s;
    this.select_count = is_select;
  }

  showModalInList(type:string,type1:string,is_more:string,pr_id): void {
    this.editStatusPurchaseId = pr_id;
    this.operate_type = type;
    this.operate_button_type = type1;
    this.operate_button_type_is_more = is_more;
    let s  = [];
    let is_select = 0;
    this.selects.forEach((val, idx, array) => {
      if (val == true) {
        s[idx] = val;
        is_select += 1;
      }
    });
    this.selects = s;
    this.select_count = is_select;
  }


  getOperateTypes(value:any){
    this.operate_type = '';
    this.operate_button_type = '';

    this.editStatusPurchaseId = 0;
    this.pr_u_id = '';
    this.pr_status = '';
    this.pr_u_username = '';
    this.pr_order = '';
    this.getPurchaseList("1");
  }

}
