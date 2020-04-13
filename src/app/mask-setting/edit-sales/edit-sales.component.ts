  import {Component, OnInit, ViewChild} from '@angular/core';
  import {ActivatedRoute, Router} from "@angular/router";
  import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
  import {GlobalService} from "../../core/global.service";
  import {FormBuilder, FormGroup} from '@angular/forms';
  import {ModalDirective} from "ngx-bootstrap";
  import {NotificationService} from "../../shared/utils/notification.service";

  @Component({
  selector: 'app-edit-sales',
  templateUrl: './edit-sales.component.html',
  })
  export class EditSalesComponent implements OnInit {
  formModel : FormGroup;
  pr_id : any = '';
  purchaseList : any = [];
  userList : any = [];
  purchaseInfo : any = [];
  addressList : any = [];

  //默认选中值
  pr_supplier_default : number = 0; //下单用户
  customer_addr_id_default : number = 0; //收货地址

  datePickerConfig = {
    locale: 'zh-CN',
    format:'YYYY-MM-DD',
    enableMonthSelector:true,
    showMultipleYearsNavigation:true,
  };

  //用作全选和反选
  selects : Array<any> = [];
  selects_index : Array<any> = [];
  check : boolean = false;

  isDetail : string = '';
  keyword : string = '';
  keyword_product : string = '';

  selectProductLists: Array<any> = [];

  category_type : number = 22; //销售类型
  p_type : number = 2;//商品
  // p_property : number = 2; //销售商品  20180507修改此参数为销售库存和外购库存均能被销售，因为进入了库存表的商品均为可被销售的库存商品
  role : number = 6; //冻龄智美客户角色
  rollback_url : string = '';
  p_pur_prices : number = 0;
  url:string = '';

  /**--------用作选择库存产品的变量------*/
  isShowProduct : string = '';
  selectProductList :Array<any> = [];//[{"p_product_id": "0","p_qrcode": "0","category": "0","p_unit": "0","p_count": "0","p_price": "0","p_pur_price": "0","p_note": "","p_is": "1"}]; //选中后的商品列表
  category_type_product : number = 6; //商品分类
  searchProductList : any = [];//搜索出的商品列表信息
  productDefault : any = [];//弹框中商品分类
  // 弹框中左侧选中商品分类的id
  select_category_ids: Array<any> = [];
  select_category_ids_preporty: Array<any> = [];

  /**--------用作审核的变量------*/
  approve_users : Array<any> = [];
  /**选中的审批者*/
  approve_user : Array<any> = [];
  /**选中的关注者*/
  follower_user : Array<any> = [];
  /**转交人 */
  transfer_user : Array<any> = [];
  remove_user_ids : Array<any> = [];
  approval_or_copy : string = '';
  is_show_detail : string = '';
  is_show_details : string = '';

  operate_type : string = '';//操作弹框类型
  operate_button_type : string = '';//操作按钮类型
  operate_button_type_is_more : string = '';//是否是批量操作
  operate_types : string = '';//操作弹框类型
  uid : any = 0;
  create_user_id: any = 0;
  log_table_name:string = 'purchase';
  log_type:string = 'purchase_sale_mall';
  /**菜单id */
  menu_id:any;
  /** 权限 */
  permissions : Array<any> = [];
  constructor(
    fb:FormBuilder,
    private router : Router,
    private routInfo : ActivatedRoute,
    private cookieStore:CookieStoreService,
    private globalService:GlobalService,
    private notificationService: NotificationService) {

    this.url = this.globalService.getDomain();
    this.uid = this.cookieStore.getCookie('uid');
    let pr_ids = routInfo.snapshot.params['pr_id'];
    if(pr_ids != '' && pr_ids != '0'){
        if(pr_ids.indexOf('_') >= 0){
            let pr_ids_ = pr_ids.split('_');
            this.pr_id = pr_ids_[0];
            this.isDetail = pr_ids_[1];
        }else{
            this.pr_id = pr_ids;
        }
        this.getPurchaseInfo(this.pr_id);
        this.rollback_url += '/' + pr_ids;
    }else{
        this.rollback_url += '/0';
    }
  this.formModel = fb.group({
    pr_id:[''],
    pr_order:[''],
    pr_date:[''],
    pr_type:[7],
    pr_supplier:[''],
    frozeno_customer_addr_id:[''],
    pr_detail:[''],
    pr_note:[''],
    pr_assign:[''],
    pr_copy_person:[''],
  });
  }

  ngOnInit() {
  this.getPurchaseDefault('');

    //顶部菜单读取
    this.globalService.getMenuInfo();
    setTimeout(()=>{
        this.menu_id = this.globalService.getMenuId();
        this.rollback_url = this.globalService.getMenuUrl();
        this.permissions = this.globalService.getPermissions();
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

  getPurchaseInfo(pr_id:number){
  this.globalService.httpRequest('get','getPurchaseInfo?pr_id='+pr_id)
    .subscribe((data)=>{
      this.purchaseInfo = data;
      this.formModel.patchValue({
        pr_id:this.purchaseInfo['result']['pr_id'],
        pr_order:this.purchaseInfo['result']['pr_order'],
        pr_date:this.purchaseInfo['result']['pr_date'],
        pr_type:this.purchaseInfo['result']['pr_type'],
        pr_supplier:this.purchaseInfo['result']['pr_supplier'],
        frozeno_customer_addr_id:this.purchaseInfo['result']['frozeno_customer_addr_id'],
        pr_qrcode:this.purchaseInfo['result']['pr_qrcode'],
        pr_note:this.purchaseInfo['result']['pr_note'],
        //审核加入
        pr_assign:this.purchaseInfo['result']['pr_assign'],
        pr_copy_person:this.purchaseInfo['result']['pr_copy_person'],
      });
      this.pr_supplier_default = this.purchaseInfo['result']['pr_supplier']; //下单客户
      this.customer_addr_id_default = this.purchaseInfo['result']['frozeno_customer_addr_id']; //收货地址
      //获取下单客户地址列表
      this.getFrozenoCustomerAddress(this.purchaseInfo['result']['pr_supplier']);
      //审核加入
      this.create_user_id = this.purchaseInfo['result']['u_id'];//当前创建者
      this.approve_user = this.purchaseInfo['result']['assign_user_name'];
      this.follower_user = this.purchaseInfo['result']['copy_user'];

      this.selectProductList = this.purchaseInfo['result']['details'];
      this.sumPCount();
    });

  }

  /**
  * 获取采购员信息
  */
  getUserList(obj,num:number){
  let id = 0;
  if(num == 1){
    id = obj.target.value;
  }else{
    id = obj;
  }
  let url = 'getPurchaseUser';
  if(id != 0){
    url += '?category_id='+id;
  }
    this.globalService.httpRequest('get',url)
      .subscribe((data)=>{
        this.userList = data;
        if(this.userList['status'] == 201){
          alert(this.userList['msg']);
        }
      });
  }


  /**
  * 获取默认参数
  *  type  : refresh 局部刷新  ‘’ 默认调用
  */
  getPurchaseDefault(type:any) {
  let url = 'getPurchaseDefault?role='+this.role+'&sid='+this.cookieStore.getCookie('sid');
    this.globalService.httpRequest('get',url)
  .subscribe((data)=>{
    this.purchaseList = data;
    if(this.purchaseList['status'] == 202){
      alert(this.purchaseList['msg']);
      this.cookieStore.removeAll(this.rollback_url);
      this.router.navigate(['/auth/login']);
    }
  });
  }

    /**
     * 获取下单客户的收货地址
     *
     */
    getFrozenoCustomerAddress(customer_id) {
      let url = 'getPurchaseDefault?customer_id='+customer_id+'&role='+this.role+'&sid='+this.cookieStore.getCookie('sid');
      this.globalService.httpRequest('get',url)
        .subscribe((data)=>{
          this.addressList = data;
          if(this.addressList['status'] == 202){
            alert(this.addressList['msg']);
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }
        });
    }

  onSubmit(num :number){
  if(this.formModel.value['pr_date'].trim() == ''){
    alert('请填写单据日期！');
    return false;
  }
  if(this.formModel.value['pr_order'].trim() == ''){
    alert('请填写单据号！');
    return false;
  }
    let approve_user_ids = [];
  if(this.approve_user.length > 0) {
      this.approve_user.forEach((val, idx, array) => {
          approve_user_ids.push(val['id'].toString());
      });
  }
    let follower_user_ids = [];
    if(this.follower_user.length > 0) {
        this.follower_user.forEach((val, idx, array) => {
            follower_user_ids.push(val['id'].toString());
        });
    }

    this.globalService.httpRequest('post','addPurchase',{
    'pr_id':this.formModel.value['pr_id'],
    'pr_order':this.formModel.value['pr_order'],
    'pr_date':this.formModel.value['pr_date'],
    'pr_type':this.formModel.value['pr_type'],
    'pr_supplier':this.formModel.value['pr_supplier'],
    'frozeno_customer_addr_id':this.formModel.value['frozeno_customer_addr_id'],
    'storehouse_id':1,
    'pr_qrcode':this.formModel.value['pr_qrcode'],
    'pr_note':this.formModel.value['pr_note'],
    'pr_assign':JSON.stringify(approve_user_ids),
    'pr_copy_person':JSON.stringify(follower_user_ids),
    'pr_detail' :JSON.stringify(this.selectProductList),
    'u_id':this.cookieStore.getCookie('uid'),
    'sid':this.cookieStore.getCookie('sid')
  }).subscribe((data)=>{
    alert(data['msg']);
    if(data['status'] == 200) {
        if(num == 2){
            this.clear_();
        }else {
            this.router.navigate(['/mask-setting/sales']);
        }
    }else if(data['status'] == 202){
      this.cookieStore.removeAll(this.rollback_url);
      this.router.navigate(['/auth/login']);
    }
  });
  }

  clear_(){
    this.formModel.patchValue({
        pr_id:'',
        pr_order:'',
        pr_date:'',
        pr_type:'',
        pr_supplier:'',
      frozeno_customer_addr_id:'',
        pr_qrcode:'',
        pr_note:'',
        //审核加入
        pr_assign:'',
        pr_copy_person:'',
    });
    this.pr_supplier_default = 0; //供应商
    this.customer_addr_id_default = 0;
    //审核加入
    this.create_user_id = 0;//当前创建者
    this.approve_user = [];
    this.follower_user = [];

    this.selectProductList = [];
  }

  /**
   * 计算金额总数
   */
  sumPCount(){
      this.p_pur_prices = 0;
      this.selectProductList.forEach((val, idx, array) => {
          this.p_pur_prices += (parseInt(val['frozeno_discount_amount'])*parseInt(val['p_count']));
      });
  }
  //移除商品
  removeInput(ind) {
      this.selectProductList.splice(ind, 1);
      this.sumPCount();
  }
  canInput($event,count1,old_p_count,openinginventory_surplus_count){
      let count_ = count1 - old_p_count;  //当前输入数量 - 老的数量= 增加或减少的数量
      if(count_ > openinginventory_surplus_count){
          alert('库存不足,请修改使用数量在总数量以内。');
          return false;
      }
      if($event.target.value > (openinginventory_surplus_count + old_p_count)){
          $event.target.value = old_p_count;
      }
  }

  //--------------弹框  选择产品--------------
  showProduct(){
      this.isShowProduct = 'product'; //显示商品弹框
      this.getCategoryList();
  }
  /**
  * 获取冻龄智美商品以下单
  */
  getCategoryList(){
  let url = 'getCategoryList?category_type=50&sid='+this.cookieStore.getCookie('sid');
  if(this.keyword_product.trim() != '') {
    url += '&keyword='+this.keyword_product.trim();
  }
  this.globalService.httpRequest('get',url)
    .subscribe((data)=>{
      this.searchProductList = data;
      if(this.searchProductList['status'] == 202){
        alert(this.searchProductList['msg']);
        this.cookieStore.removeAll(this.rollback_url);
        this.router.navigate(['/auth/login']);
      }
    });

  }

  noClick(){
  alert('库存不足,无法被选择.');
  }

  //点击列表checkbox事件
  handle(e,ind:number){
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
  if(c == true){
    this.selects_index[ind] = v;
  }else{
    this.selects_index[ind] = v+'_';
  }
  if(isAll >= 1){
    this.check = false;
  }else{
    this.check = true;
  }
  }


  //添加 并选入商品
  addInput() {
    let spl : Array<any> = [];
    this.selectProductLists.forEach((val1, idx1, array1) => {
      spl.push(val1['category_id']);
    });
    if(spl.length > 0){
      this.selects_index.forEach((val, idx, array) => {
        let v1 = val.split('_');
        if (val.indexOf('_') < 0 && !this.cookieStore.in_array(val, spl)) {
          this.selectProductLists[this.selectProductLists.length] = (this.searchProductList['result']['productList'][idx]);
        }else if(val.indexOf('_') >= 0 && this.cookieStore.in_array(v1[0], spl)) {
          this.selectProductLists.forEach((valp, idxp, arrayp) => {
            if(v1[0] == valp['category_id']){
              this.selectProductLists.splice(idxp, 1);
              return ;
            }
          });
        }
      });
    }else{
      this.selects_index.forEach((val, idx, array) => {
        if (val.indexOf('_') < 0) {
          this.selectProductLists.push(this.searchProductList['result']['productList'][idx]);
        }
      });
    }
    this.selectProductList = this.selectProductLists;
    this.isShowProduct = '';
    this.sumPCount();
  }

  getProductData(value:any){
      this.selectProductList = JSON.parse(value);
  }

  closeSubmit(){
    this.isShowProduct = '';
  }
  //--------------弹框  选择审批人和关注者--------------
  showDetail(type:string){
      this.approval_or_copy = type;
      setTimeout(()=>{
          this.is_show_detail =  '1';
      },500);
  }
  /**
   * 获取任务通知点击后的状态
   * @param value
   */
  getData(value:any){
    let id = '';
    if(this.approval_or_copy == 'assign'){
        this.approve_user = JSON.parse(value);
    }else if(this.approval_or_copy == 'follower'){
        this.follower_user = JSON.parse(value);
    }else if(this.approval_or_copy == 'transfer'){
      this.transfer_user = JSON.parse(value);

      this.transfer_user.forEach((val, idx, array) => {
          id += '"'+val['id']+'",';
      });

      this.globalService.httpRequest('post','addLog',{
        'other_id':this.pr_id,
        'other_table_name':this.log_table_name,
        'log_type':this.log_type,
        'log_operation_type':'transfer',
        'log_uid':id,
        'create_user_id':this.purchaseInfo['result']['u_id'],
        'u_id':this.cookieStore.getCookie('uid'),
        'sid':this.cookieStore.getCookie('sid')
      }).subscribe((data)=>{
        if(data['status'] == 200) {
            this.getPurchaseInfo(this.pr_id);
        }else if(data['status'] == 202){
          alert(data['msg']);
          this.cookieStore.removeAll(this.rollback_url);
          this.router.navigate(['/auth/login']);
        }else if(data['status'] == 9999 || data['status'] == 201) {
            alert(data['msg']);
        }
      });

    }
  }

  getShowStatus(value:any){
      this.is_show_detail = value;
  }

  /**
   * remove user
   * @param ind
   */
  removeUser(ind:number,type:any){
      this.remove_user_ids.push(ind);
      let array_ : Array<any> = [];
      if(type == 'assign') {
          this.approve_user.forEach((val, idx, array) => {
              if (val['id'] != ind) {
                  array_.push(val);
              }
          });
          this.approve_user = array_;
      }else if(type == 'follower') {
          this.follower_user.forEach((val1, idx1, array1) => {
              if ( val1['id'] != ind) {
                  array_.push(val1);
              }
          });
          this.follower_user = array_;
      }
  }

  //-----------审核按钮操作-------
  /**
   * 显示操作弹出框
   * @param type
   */
  public showModal(type:string,type1:string): void {
      this.operate_type = type;
      this.operate_button_type = type1;
      this.operate_button_type_is_more = '';
  }

  getOperateTypes(value:any){
      this.operate_type = '';
      this.operate_button_type = '';
      this.getPurchaseInfo(this.pr_id);
  }

    /**
     * 冻龄智美  通过审核并生成订单
     */
    addOrder(){
      this.globalService.httpRequest('post','putOrder',{
        'products':JSON.stringify(this.selectProductList),
        'customer_id':this.purchaseInfo['result']['pr_supplier'],
        'amount':this.p_pur_prices,
        'ticket_id':0,
        'customer_addr_id':this.purchaseInfo['result']['frozeno_customer_addr_id'],
        'other_id': this.pr_id,  //一下为修改冻龄智美销售单通过审核并加入日志
        'other_table_name': this.log_table_name,
        'log_type': this.log_type,
        'log_operation_type': 'ok',
        'log_detail': '',
        'u_id':this.cookieStore.getCookie('uid'),
        'sid':this.cookieStore.getCookie('sid')
      }).subscribe((data)=>{
        if(data['status'] == 200) {
          this.getPurchaseInfo(this.pr_id);
        }else if(data['status'] == 202){
          alert(data['msg']);
          this.cookieStore.removeAll(this.rollback_url);
          this.router.navigate(['/auth/login']);
        }else if(data['status'] == 9999 || data['status'] == 201) {
          alert(data['msg']);
        }
      });
    }

  @ViewChild('lgModal', { static: false }) public lgModal:ModalDirective;

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

