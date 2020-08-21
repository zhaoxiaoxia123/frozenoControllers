import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {CookieStoreService} from '../../shared/cookies/cookie-store.service';
import {GlobalService} from '../../core/global.service';
import {ModalDirective} from "ngx-bootstrap";
import {split} from "ts-node/dist";
import {stringify} from "querystring";
import {EssenceNg2PrintComponent} from "essence-ng2-print";

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
  editOrderState : any = 0;
  editPrepareState : any = 0;

  verifyInfo: any = [];
  select_order_state: number = 0;
  seller_mark: string = "";
  buyer_mark: string = "";

  isNext : boolean = false;
  isNextSend : boolean = false;
  isPrint : boolean = false;

  //处理批量
  isAll : number = 0;
  width : string = '0%';
  width_1 : string = '100%';
  isSucc :boolean = false;

  orderInfo : any = [];
  expressCompany: string = '';
  expressCode:string = '';
  stockExpressCode:string = '';

  searchType: string = 'all';  //状态筛选
  stateShow:string = '全部';
  printCSS: string[];
  printStyle: string;

  dryCategoryId:number = 0;
  // 这一步很重要：获取打印标签的按钮组件，然后调用提供的print方法
  @ViewChild('printBtn', { static: true }) printBtn: EssenceNg2PrintComponent;

  rollback_url : string = '';
  /**菜单id */
  menu_id:any;
  /** 权限 */
  permissions : Array<any> = [];
  menuInfos : any = [];
  constructor(
    fb:FormBuilder,
    private router:Router,
    private cdr: ChangeDetectorRef,
    private cookieStore:CookieStoreService,
    private globalService:GlobalService
  ) {
    this.formModel = fb.group({
      keyword:[''],
    });
    this.getUserOrderList('1','');
    window.scrollTo(0,0);
    this.dryCategoryId = this.globalService.category44;
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
       .rt-flex{
            display: flex;
            font-size:8px;
        }
        .rt-header-img img{
            width:200px;
        }
        .rt-item-hd{
            padding-bottom:20px;
        }
        .rt-font-lg{
            font-size:16px;
            font-weight: bold;
        }
        .rt-main-doc{
            width:50%;
            padding:0 20px;
            margin-bottom:80px;
        }
        .rt-one{
            text-align: center;
        }
        .rt-one-mg{
            width:240px;
        }
        .rt-item{
            display: flex;
            justify-content: space-between;
        }
        .rt-table-hd{
            display: flex;
            justify-content: space-between;
            margin-top:10px;
        }
        table.rt-gridtable {
            width:100%;
            color:#333;
            border-width: 1px;
            border-color: #666;
            border-collapse: collapse;
            margin-top:6px;
            text-align: center;
        }
        table.rt-gridtable th {
            width:20%;
            border-width: 1px;
            padding: 8px;
            border-style: solid;
            border-color: #666;
            background-color: #333;
            text-align: center;
            color:#fff;
        }
        table.rt-gridtable td {
            width:20%;
            border-width: 1px;
            padding:8px;
            border-style: solid;
            border-color: #666666;
            background-color: #ffffff;
            text-align: center;
        }
        .ft-left{
            text-align:left;
        }
        .rt-mg{
            width:240px;
        }
        .rt-table-right{
            text-align:right;
        }
        .rt-center{
            text-align: center;
        }
        .rt-ft{
            text-align:center;
            padding:20px;
            font-size:12px;
        }

        `;
  }


  print() {
    this.printBtn.print(); // 通过父组件来调用子组件的方法，用来触发打印功能
  }
  /**
   * 打印选中用户订单
   */
  beforePrint(){
    this.isPrint = true;
    if(this.editStatusUserOrderId){
      this.getOrderInfo();
      // this.globalService.httpRequest('get','getOrderInfo?o_id='+this.editStatusUserOrderId+'&sid='+this.cookieStore.getCookie('sid'))//&type=detail
      //   .subscribe((data)=>{
      //     this.orderInfo = data;
      //   });
    }else{
      alert('请选中要打印的用户订单');
    }
    let that =this;
    setTimeout(function () {
      that.isPrint = false;
    },2000)
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
  getUserOrderList(number:string,search_type:string,state:string = '') {
    if(state){
      this.stateShow = state;
    }
    if(search_type != '') {
      this.searchType = search_type;
    }
    let url = 'getDLZMOrderList?page='+number+'&role='+this.cookieStore.getCookie('urole')+'&sid='+this.cookieStore.getCookie('sid');
    if(this.formModel.value['keyword'].trim() != ''){
      url += '&keyword='+this.formModel.value['keyword'].trim();
    }
    if(this.searchType != "all"){
      url += '&order_state='+this.searchType;
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
    this.getUserOrderList(this.page,'');
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
    this.getUserOrderList('1','');
  }

  /**
   * 获取仓库详情
   * @param type
   */
  detailUserOrder(type:string){
    if(this.editStatusUserOrderId == 0){
      return false;
    }
    this.lgModal.show();

    this.getOrderInfo();
  }

  /**
   * 作废订单  未支付状态下的订单可后台作废
   */
  cancelOrder(){
    if(this.editStatusUserOrderId) {
      let param = {
        'o_id': this.editStatusUserOrderId,
        'type':'cancel',
        // 'express_code': this.stockExpressCode,
        'frozeno_order_state':this.editOrderState == 2 ? 6 : 5,
        'u_id': this.cookieStore.getCookie('uid'),
        'sid': this.cookieStore.getCookie('sid')
      };
      this.editExpress(param);
      this.getUserOrderList(this.page,'');
    }
  }


  /**
   * 备货框显示
   */
  choiceOrder(){
    if(this.editStatusUserOrderId == 0 || !(this.editOrderState == 2 && this.editPrepareState == 1)){
      return false;
    }else{
      this.choiceExampleModal.show();
      this.getOrderInfo('beihuo');
    }
  }

  /**
   * 发货框显示  1:显示发货弹框   2：发货   3：发货并跳转下一条
   */
  sendOrder(num){
    if(num == 1) {
      this.sendExampleModal.show();
      this.getOrderInfo();
    }else if(num == 2) {
      this.sendOrderToExpress(1);
    }else if(num == 3) {
      this.sendOrderToExpress(2);
    }
  }

  /**
   * 获取订单详情
   * type beihuo:备货弹框
   */
  getOrderInfo(type='') {
    let url = 'getOrderInfo?o_id='+this.editStatusUserOrderId+'&type='+type+'&sid='+this.cookieStore.getCookie('sid');
    if(this.isNext) {
      url += '&is_next='+this.isNext;
    }
    if(this.isNextSend) {
      url += '&is_next_send='+this.isNextSend;
    }
    this.globalService.httpRequest('get',url)//&type='+type+'
      .subscribe((data)=> {
        this.orderInfo = data;
        if (data['status'] == 201 && this.isNext){
          alert(data['msg']);
          this.closeChoice();
        }
        if (data['status'] == 201 && this.isNextSend){
          alert(data['msg']);
          this.closeExpress();
        }
        this.editStatusUserOrderId = this.orderInfo['result']['o_id'];
        this.editPrepareState = this.orderInfo['result']['frozeno_prepare_state'];
        this.editOrderState = this.orderInfo['result']['frozeno_order_state'];
        this.stockExpressCode = this.orderInfo?this.orderInfo['result']['frozeno_express_code']:'';
        this.expressCode = this.orderInfo?this.orderInfo['result']['frozeno_express_code']:'';
        this.expressCompany = this.orderInfo?this.orderInfo['result']['frozeno_express_company']:'';
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        if(this.isPrint) {
          this.print();
        }
      });
  }

  /**
   * 备货并发货框    快递单号录入
   */
  expressCodeEntry(){
    if(this.stockExpressCode.trim() == ''){
      alert('请填写快递单号！');
      return false;
    }
    let param = {
      'o_id':this.editStatusUserOrderId,
      'express_code':this.stockExpressCode,
      'expres_company':this.expressCompany,
      // 'frozeno_order_state':3,
      'u_id':this.cookieStore.getCookie('uid'),
      'sid':this.cookieStore.getCookie('sid')
    };
    this.editExpress(param);
  }

  /**
   * 关闭备货框
   */
  closeChoice(){
    this.isNext = false;
    this.choiceExampleModal.hide();
  }

  /**
   * 关闭发货框
   */
  closeExpress(){
    this.isNextSend = false;
    this.sendExampleModal.hide();
  }
  /**
   * 发货
   */
  editExpress(param){
    this.globalService.httpRequest('post','editExpress',param).subscribe(
      (data)=>{
        alert(data['msg']);
        if(data['status'] == 200){
          // this.orderInfo['result']['frozeno_express_company'] = "顺丰";
          // this.orderInfo['result']['frozeno_express_code'] = this.expressCode;
          this.getUserOrderList(this.page,'');
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
   * 备货录入
   * num  (1:备货  2：备货并进入下一条)
   */
  stockEntry(num){
    let isError = 0;
    let arrStr = [];
    for (let i = 0 ;i < this.orderInfo['result']['products'].length;i++){
      let arr = this.sumPCount(i);
      let goArray = {
        'attach_id':this.orderInfo['result']['products'][i]['attach_id'],
        'product_code':this.orderInfo['result']['products'][i]['product_code'],
        'count':this.orderInfo['result']['products'][i]['choice_count']
      };
      arrStr.push(goArray);
      let beihuoDetail = this.orderInfo['result']['products'][i]['beihuoDetail'];
      for (let b = 0 ;b < beihuoDetail.length;b++) {
        let totalCount = 0;
        for (let a = 0 ;a < arr.length;a++) {
          if (arr[a].indexOf(beihuoDetail[b]['key']) == 3 && beihuoDetail[b]['count'] >= 1) {
            totalCount += 1;
          }
        }
        console.log('totalCount:-----');
        console.log(totalCount);
        console.log('count:-----');
        console.log(beihuoDetail[b]['count']);

        if(totalCount != beihuoDetail[b]['count']){
          isError ++;
          this.orderInfo['result']['products'][i]['border_color'] = "red";
        }
      }
    }
    this.cdr.markForCheck();
    this.cdr.detectChanges();
    if(isError <= 0){
      this.globalService.httpRequest('post','putPrepare',{
        'order_id':this.editStatusUserOrderId,
        'join_list':JSON.stringify(arrStr),
        'u_id':this.cookieStore.getCookie('uid'),
        'sid':this.cookieStore.getCookie('sid')
      }).subscribe( (data)=>{
          alert(data['msg']);
          if(data['status'] == 200){
            this.orderInfo['result']['frozeno_express_company'] = this.expressCompany;
            this.orderInfo['result']['frozeno_express_code'] = this.expressCode;
            this.getUserOrderList(this.page,'');
            if(num == 1){
              this.closeChoice();
            }else if(num == 2){
              // this.editStatusUserOrderId = 0;  //下一个备货的id
              this.isNext = true;
              this.getOrderInfo();
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
    }else{
      alert('录入信息有误，请检查');
    }
  }

  /**
   * 清空备货录入
   */
  clearStock(){
    if(this.orderInfo['result']['products']){
      for (let i = 0 ;i < this.orderInfo['result']['products'].length;i++){
        this.orderInfo['result']['products'][i]['product_code'] = '';
        this.orderInfo['result']['products'][i]['choice_count'] = 0;
        // this.sumPCount(this.orderInfo['result']['products_disintegrate'][i]['product_code'],i);
      }
    }
  }
  /**
   * 计算当前扫码个数
   */
  sumPCount(index){
    let item = this.orderInfo['result']['products'][index];
    let code = item['product_code'];
    let strArr = [];
    let n = 13;
    for (let i = 0, l = code.length; i < l/n; i++) {
      let a = code.slice(n * i, n * (i + 1));
      strArr.push(a);
    }
    item['choice_count'] = strArr.length;
    this.orderInfo['result']['products'][index]['choice_count'] = strArr.length;
    console.log(this.orderInfo['result']['products'][index]['beihuoTotalCount']);
    console.log(item);
    if(!((this.orderInfo['result']['products'][index]['beihuoTotalCount'] != item['choice_count'] && item['product_code'] != '')|| item['border_color']=='red')){
      this.isSucc = true;
    }
    return strArr;
  }

  /**
   * 发货框  快递单号录入
   */
  expressCodeInput(){
    if(this.expressCode.trim() == ''){
      alert('请填写快递单号！');
      return false;
    }
    let param = {
      'o_id':this.editStatusUserOrderId,
      'express_code':this.expressCode,
      'express_company':this.expressCompany,
      // 'frozeno_order_state':3,
      'u_id':this.cookieStore.getCookie('uid'),
      'sid':this.cookieStore.getCookie('sid')
    };
    this.editExpress(param);
  }


  /**
   * 发货框  num : 1:  发货  2:发货并显示下一条
   */
  sendOrderToExpress(num){
    let param = {
      'o_id': this.editStatusUserOrderId,
      // 'express_code':this.expressCode,
      'frozeno_order_state': 3,
      'u_id': this.cookieStore.getCookie('uid'),
      'sid': this.cookieStore.getCookie('sid')
    };
    this.editExpress(param);

    this.getUserOrderList(this.page,'');
    if(num == 1){
      this.closeExpress();
    }else if(num == 2){
      // this.editStatusUserOrderId = 0;  //下一个发货的id
      this.isNextSend = true;
      this.getOrderInfo();
    }
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
  isStatusShow(o_id:any,state:string,prepare_state:string){
    this.editStatusUserOrderId = o_id;
    this.editOrderState = state;
    this.editPrepareState = prepare_state;

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

  /**
   * 显示审核表单
   */
  showVerify(){
    this.clearValue();
    let url = 'getOrderInfo?o_id='+this.editStatusUserOrderId+'&type=sales&sid='+this.cookieStore.getCookie('sid');
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
  }
  /**
   * 赋值
   */
  setValue() {
    this.select_order_state = this.verifyInfo['frozeno_order_state'];
    this.seller_mark = this.verifyInfo['apply_detail']['seller_mark'];
    this.buyer_mark = this.verifyInfo['apply_detail']['buyer_mark'];
  }


  /**
   * 赋空值
   */
  clearValue() {
    this.verifyInfo = [];
    this.select_order_state = 0;
    this.seller_mark = '';
    this.buyer_mark = '';
  }
  /**
   * 保存审核内容
   */
  submitVerify(num) {
    if(this.buyer_mark == '' && this.seller_mark == ''){
      alert('请填写需提交的信息后再保存！');
      return false;
    }
    this.globalService.httpRequest('post','submitOrderVerify',{
      'o_id':this.editStatusUserOrderId,
      'seller_mark':this.seller_mark,
      'buyer_mark':this.buyer_mark,
      'order_state':this.select_order_state,
      'is_verify':num,
      'sid':this.cookieStore.getCookie('sid')
    }).subscribe( (data)=>{
        alert(data['msg']);
        if(data['status'] == 200){
          this.verifyModal.hide();
          this.getUserOrderList(this.page,'');
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


  @ViewChild('verifyModal', { static: true }) public verifyModal:ModalDirective;
  @ViewChild('lgModal', { static: true }) public lgModal:ModalDirective;
  @ViewChild('choiceExampleModal', { static: true }) public choiceExampleModal:ModalDirective;
  @ViewChild('sendExampleModal', { static: true }) public sendExampleModal:ModalDirective;
}
