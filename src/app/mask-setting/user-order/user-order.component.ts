import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {CookieStoreService} from '../../shared/cookies/cookie-store.service';
import {GlobalService} from '../../core/global.service';
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
})
export class UserOrderComponent implements OnInit {

  orderList : any = [];
  page : any;
  prev : boolean = false;
  next : boolean = false;

  formModel : FormGroup;
  //用作全选和反选
  selects : Array<any> = [];
  check : boolean = false;

  //顶部按钮是否启用显示
  editStatusUserOrderId : any = 0;
  //处理批量
  isAll : number = 0;
  width : string = '0%';
  width_1 : string = '100%';

  orderInfo : any = [];
  express_code:string = '';


  printCSS: string[];
  printStyle: string;


  rollback_url : string = '';
  /**菜单id */
  menu_id:any;
  /** 权限 */
  permissions : Array<any> = [];
  menuInfos : any = [];
  constructor(
    fb:FormBuilder,
    private router:Router,
    private cookieStore:CookieStoreService,
    private globalService:GlobalService
  ) {
    this.formModel = fb.group({
      keyword:[''],
    });
    this.getUserOrderList('1');
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


    this.printCSS = ['http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css'];
    this.printStyle =
      `
        th, td {
            color: red !important;
        }
        `;
  }


  printComplete () {
    console.log('打印完成！');
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
   * 获取用户订单列表
   * @param number
   */
  getUserOrderList(number:string) {
    let url = 'getOrderList?page='+number+'&sid='+this.cookieStore.getCookie('sid');
    if(this.formModel.value['keyword'].trim() != ''){
      url += '&keyword='+this.formModel.value['keyword'].trim();
    }
    this.globalService.httpRequest('get',url)
      .subscribe((data)=>{
        this.orderList = data;
        if(this.orderList) {
          if (this.orderList['status'] == 202) {
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }
          if (this.orderList) {
            if (this.orderList['result']['current_page'] == this.orderList['result']['last_page']) {
              this.next = true;
            } else {
              this.next = false;
            }
            if (this.orderList['result']['current_page'] == 1) {
              this.prev = true;
            } else {
              this.prev = false;
            }
            this.selects = [];
            for (let entry of this.orderList['result']['data']) {
              this.selects[entry['o_id']] = false;
            }
            this.check = false;
          }
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
   * 分页
   */
  pagination(page : string) {
    this.page = page;
    this.getUserOrderList(this.page);
  }

  /**
   * 删除信息
   * @param type
   * @returns {boolean}
   */
  deleteUserOrder(type : any){
    if(this.globalService.demoAlert('','')){
      return false;
    }
    let msg = '';
    let o_id : string = '';
    if(type == 'id'){
      o_id = this.editStatusUserOrderId;
    } else if(type == 'all') {
      let is_select = 0;
      this.selects.forEach((val, idx, array) => {
        if (val == true) {
          o_id += idx + ',';
          is_select += 1;
        }
      });
      if (is_select < 1) {
        msg = '请确认已选中需要删除的信息！';
        alert(msg);
        return false;
      }
    }
    msg = '删除后将不可恢复，您确定要删除吗？';
    if(confirm(msg)) {
      let url = 'deleteOrderById?o_id=' + o_id + '&page=1&type='+type+'&sid='+this.cookieStore.getCookie('sid');
      if(this.formModel.value['keyword'].trim() != ''){
        url += '&keyword='+this.formModel.value['keyword'].trim();
      }
      this.globalService.httpRequest('delete',url)
        .subscribe((data) => {
          if(this.orderList['status'] == 200){
            this.orderList = data;
          }else if(this.orderList['status'] == 201 || this.orderList['status'] == 202){
            alert(this.orderList['msg']);
          }
          if(this.orderList['status'] == 202){
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }
          if (this.orderList) {
            if (this.orderList['result']['current_page'] == this.orderList['result']['last_page']) {
              this.next = true;
            } else {
              this.next = false;
            }
            if (this.orderList['result']['current_page'] == 1) {
              this.prev = true;
            } else {
              this.prev = false;
            }

            this.selects = [];
            for (let entry of this.orderList['result']['data']) {
              this.selects[entry['o_id']] = false;
            }
            this.check = false;
          }
        });
    }
  }

  /**
   * 提交搜索
   */
  onSubmit(){
    this.getUserOrderList('1');
  }

  /**
   * 获取仓库详情
   * @param o_id
   */
  detailUserOrder(type:string){
    if(this.editStatusUserOrderId == 0){
      return false;
    }
    this.lgModal.show();
    this.globalService.httpRequest('get','getOrderInfo?o_id='+this.editStatusUserOrderId+'&type='+type+'&sid='+this.cookieStore.getCookie('sid'))
      .subscribe((data)=>{
        this.orderInfo = data;
      });
  }

  /**
   * 发货  ,新增快递单号
   */
  sendProduct(){
    if(this.express_code.trim() == ''){
      alert('请填写快递单号！');
      return false;
    }
    this.globalService.httpRequest('post','editExpress',{
      'o_id':this.editStatusUserOrderId,
      'express_code':this.express_code,
      'u_id':this.cookieStore.getCookie('uid'),
      'sid':this.cookieStore.getCookie('sid')
    }).subscribe( (data)=>{
        alert(data['msg']);
        if(data['status'] == 200){
          this.orderInfo['result']['frozeno_express_company'] = "顺丰";
          this.orderInfo['result']['frozeno_express_code'] = this.express_code;
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
   * 演示账号输出
   * @param url
   * @param param
   */
  isDemo(url:string,param:any){
    if(param == '1'){
      param = this.editStatusUserOrderId;
    }
    this.globalService.demoAlert(url,param);
  }

  /**
   * 顶部
   */
  isStatusShow(o_id:any){
    this.editStatusUserOrderId = o_id;

    this.isAll = 0;
    this.width = '0%';
    this.width_1 ='100%';
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
      this.editStatusUserOrderId = 0;
      this.width = '10%';
      this.width_1 = '90%';
    }
  }

  @ViewChild('lgModal', { static: true }) public lgModal:ModalDirective;
}
