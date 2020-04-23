import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {GlobalService} from "../../core/global.service";
import {ModalDirective} from "ngx-bootstrap";
import {NotificationService} from "../../shared/utils/notification.service";
import {getProvince,getArea,getCity} from "../../shared/common/area";

@Component({
    selector: 'app-unit-list',
    templateUrl: './unit-list.component.html',
})
export class UnitListComponent implements OnInit {
    public states: Array<any>;
    public state: any = {
        tabs: {
            demo3: 'hr1',
        },
    };
    page : any;
    prev : boolean = false;
    next : boolean = false;

    customerDefault : any = [];
    customerList : any = [];
    customerInfo : any = [];
    //用作全选和反选
    selects : Array<any> = [];
    check : boolean = false;

    //默认值
    c_id:number = 0;
    c_number: string = '';
    c_name: string = '';
    c_role: number = 0;
    c_category_id: number = 0;//上级分类
    c_phone: string = '';
    c_address: string = '';
    c_abbreviation: string = '';
    // c_price_type: number = 0;
    c_notes: string = '';
    c_contacts: string = '';
    user_title: string = '';
    user_phone: string = '';
    user_mobile: string = '';
    user_email: string = '';
    user_qq: string = '';
    user_addr: string = '';
    departmentInfo : any = [];//业务员所属部门信息
    unitCategoryList : any = [];// 选中客户类型的单位分类列表
    department : string = '';
    c_follow_user_id: number = 0;
    c_tax: string = '';
    c_tax_number: string = '';
    c_bank: string = '';
    c_bank_account: string = '';
    c_discount_rate: string = '';
    c_credit_amount: string = '';

    //冻龄智美
    // provinces : string[] = [];
    // citys : string[] = [];
    // areas : string[] = [];
    checkIndex: number = 0;
    customer_addr: any = [{'provinces':[],'citys':[],'areas':[],'customer_addr_name':'','customer_addr_phone':'','province':'','city':'','area':'','customer_address':'','is_default':0}];
    edit_customer_addr: any = [];//修改用户信息时 存储需修改的地址信息
    // customer_addr_name: string = '';
    // customer_addr_phone: string = '';
    // province : string = '';
    // city: string = '';
    // area: string = '';
    // customer_address:string = '';
    // is_default:number = 0;

    //顶部启动 和无效是否启用显示
    editStatusCustomerId : any = 0;
    isStatus : any = 0;
    //处理批量
    isAll : number = 0;
    width : string = '0%';
    width_1 : string = '80%';

    keyword : string = '';
    cid : any = 0;//当前登录用户的所属公司id
    super_admin_id : any = 0;//超级管理员所属公司id
    // role : string = '3,4';
    role : string = '6';   //冻龄智美客户
    category_type : number = 21;
    rollback_url : string = '';
    /**菜单id */
    menu_id:any;
    /** 权限 */
    tempDomain:string = '';
    permissions : Array<any> = [];
    menuInfos : any = [];
    constructor(
        private router : Router,
        private cookieStore:CookieStoreService,
        private globalService:GlobalService,
        private notificationService: NotificationService) {
        this.tempDomain = this.globalService.tempDomain;
        window.scrollTo(0,0);
        this.super_admin_id = this.globalService.getAdminID();
        this.cid = this.cookieStore.getCookie('cid');

        this.getCustomerList('1');
        this.getCustomerDefault();
        this.customer_addr[this.checkIndex]['provinces'] = getProvince(); //住址
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

    showPinyin(){
        let name = this.c_name;
        if(name.trim() != ''){
            this.globalService.httpRequest('get','getPinyin?name='+name)
                .subscribe((data)=>{
                    this.c_abbreviation = data['result'];
                });
        }
    }

    getCity(ind){
        this.checkIndex = ind;
        let pro = this.customer_addr[this.checkIndex]['province'];
        this.customer_addr[this.checkIndex]['citys'] = getCity(pro);
        this.customer_addr[this.checkIndex]['areas'] = [];
    }
    getArea(ind){
        this.checkIndex = ind;
        let pro = this.customer_addr[this.checkIndex]['province'];
        let city = this.customer_addr[this.checkIndex]['city'];
        this.customer_addr[this.checkIndex]['areas'] = getArea(pro,city);
    }
    checkDefault(){
        this.customer_addr[this.checkIndex]['is_default'] = !this.customer_addr[this.checkIndex]['is_default'];
    }
    clickToEdit(ind){
        this.checkIndex = ind;
    }
    addList(){
        this.customer_addr.push({'provinces':[],'citys':[],'areas':[],'customer_addr_name':'','customer_addr_phone':'','province':'','city':'','area':'','customer_address':'','is_default':0});
        this.checkIndex = this.customer_addr.length - 1;
        this.customer_addr[this.checkIndex]['provinces'] = getProvince(); //住址
        console.log( this.customer_addr);
    }
    /**
     * 获取默认参数
     */
    getCustomerDefault(){
        this.globalService.httpRequest('get','getCustomerDefault?role='+this.role+'&category_type='+this.category_type+'&sid='+this.cookieStore.getCookie('sid'))
            .subscribe((data)=>{
                this.customerDefault = data;
                if(this.customerDefault['status'] == 202){
                    alert(this.customerDefault['msg']);
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }
            });
    }
    /**
     * 获取客户列表
     * @param number
     */
    getCustomerList(number:string) {
        let url = 'getCustomerList?role='+this.role+'&page='+number+'&sid='+this.cookieStore.getCookie('sid');
        if(this.keyword.trim() != '') {
            url += '&keyword='+this.keyword.trim();
        }
        this.globalService.httpRequest('get',url).subscribe((data)=>{
            this.customerList = data;
            if(this.customerList['status'] == 202){
                this.cookieStore.removeAll(this.rollback_url);
                this.router.navigate(['/auth/login']);
            }

            this.selects = [];
            for (let entry of this.customerList['result']['customerList']['data']) {
                this.selects[entry['c_id']] = false;
            }
            this.check = false;
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
     * 获取业务员所属部门
     */
    getDepartment(obj,num:number){
        let id = 0;
        if(num == 1){
            id = obj.target.value;
        }else{
            id = obj;
        }
        let url = 'getDepartment';
        if(id != 0){
            url += '?u_id='+id;
        }
        this.globalService.httpRequest('get',url)
            .subscribe((data)=>{
                this.departmentInfo = data;
                if(this.departmentInfo['status'] == 201){
                    alert(this.departmentInfo['msg']);
                }else if(this.departmentInfo['status'] == 200){
                    this.department = this.departmentInfo['result']['department_name'];
                }
            });
    }

    /**
     * 添加信息
     */
    onSubmit(num:number){
        if(this.c_number.trim() == ''){
            alert('请输入编号！');
            return false;
        }
        if(this.c_name.trim() == ''){
            alert('请输入名称！');
            return false;
        }
        this.globalService.httpRequest('post','addCustomer',{
            'c_id' : this.c_id,
            'number' : this.c_number,
            'name' : this.c_name,
            'role' : this.c_role,
            'phone' : this.c_phone,
            'address' : this.c_address,
            'abbreviation' : this.c_abbreviation,
            'notes' : this.c_notes,
            'contacts' : this.c_contacts,
            'category_id' : this.c_category_id,
            // 'price_type' : this.c_price_type,
            'user_title' : this.user_title,
            'user_phone' : this.user_phone,
            'user_mobile' : this.user_mobile,
            'user_email' : this.user_email,
            'user_qq' : this.user_qq,
            'user_addr' : this.user_addr,
            // 'department' : this.department,
            'c_follow_user_id' : this.c_follow_user_id,
            'c_tax' : this.c_tax,
            'c_tax_number' : this.c_tax_number,
            'c_bank' : this.c_bank,
            'c_bank_account' : this.c_bank_account,
            'c_discount_rate' : this.c_discount_rate,
            'c_credit_amount' : this.c_credit_amount,
            'c_status' : 1,
            'customer_addr':JSON.stringify(this.customer_addr),
            // 'customer_addr_name' : this.customer_addr_name,
            // 'customer_addr_phone' : this.customer_addr_phone,
            // 'province' : this.province,
            // 'city' : this.city,
            // 'area' : this.area,
            // 'customer_address' : this.customer_address,
            // 'is_default' : this.is_default,
            'sid':this.cookieStore.getCookie('sid')
        }).subscribe((data)=>{
            console.log(data);
            alert(data['msg']);
            if(data['status'] == 200) {
                this.clear_();
                this.customerList = data;
                this.selects = [];
                for (let entry of this.customerList['result']['customerList']['data']) {
                    this.selects[entry['c_id']] = false;
                }
                this.check = false;
                if(num == 1){
                    this.lgModal.hide();
                }
            }else if(data['status'] == 202){
                this.cookieStore.removeAll(this.rollback_url);
                this.router.navigate(['/auth/login']);
            }
        });
    }


    /**
     * 重置
     */
    clear_(){
        this.c_id = 0;
        this.c_number = '';
        this.c_name = '';
        this.c_role = 0;
        this.c_category_id = 0;//上级分类
        this.c_phone = '';
        this.c_address = '';
        this.c_abbreviation = '';
        // this.c_price_type = 0;
        this.c_notes = '';
        this.c_contacts = '';
        this.user_title = '';
        this.user_phone = '';
        this.user_mobile = '';
        this.user_email = '';
        this.user_qq = '';
        this.user_addr = '';
        this.department  = '';
        this.c_follow_user_id = 0;
        this.c_tax = '';
        this.c_tax_number = '';
        this.c_bank = '';
        this.c_bank_account = '';
        this.c_discount_rate = '';
        this.c_credit_amount = '';
        this.unitCategoryList = [];
        this.edit_customer_addr = [];
        this.customer_addr = [{'provinces':[],'citys':[],'areas':[],'customer_addr_name':'','customer_addr_phone':'','province':'','city':'','area':'','customer_address':'','is_default':0}];
    }


    /**
     * 复制
     */
    setValue(info:Array<any>){
        this.c_id = info['result']['c_id'];
        this.c_number = info['result']['c_number'];
        this.c_name = info['result']['c_name'];
        this.c_phone = info['result']['c_phone'];
        this.c_address = info['result']['c_address'];
        this.c_abbreviation = info['result']['c_abbreviation'];
        // this.c_price_type = info['result']['c_price_type'];
        this.c_notes = info['result']['c_notes'];
        this.c_contacts = info['result']['c_contacts'];
        this.user_title = info['result']['user_info']['user_title'];
        this.user_phone = info['result']['user_info']['user_phone'];
        this.user_mobile = info['result']['user_info']['user_mobile'];
        this.user_email = info['result']['user_info']['user_email'];
        this.user_qq = info['result']['user_info']['user_qq'];
        this.user_addr = info['result']['user_info']['user_addr'];
        this.c_follow_user_id = info['result']['c_follow_user_id'];
        this.c_tax = info['result']['c_tax'];
        this.c_tax_number = info['result']['c_tax_number'];
        this.c_bank = info['result']['c_bank'];
        this.c_bank_account = info['result']['c_bank_account'];
        this.c_discount_rate = info['result']['c_discount_rate'];
        this.c_credit_amount = info['result']['c_credit_amount'];
        this.c_role = info['result']['c_role'];
        if(this.c_role != 0){
            this.getUnitCategoryList(this.c_role,2);
        }
        this.c_category_id = info['result']['c_category_id'];
        this.customer_addr[0]['provinces'] = getProvince(); //住址
    }

    /**
     *  type ： （ edit ：修改  ；  detail  ： 详情）
     */
    detailCustomer(type:string){
        if(this.isStatus == 0){
            return false;
        }
        if(type == 'edit'){
            this.lgModal.show();
        }else{
            this.detailModal.show();
        }
        this.globalService.httpRequest('get','getCustomerInfo?c_id='+this.editStatusCustomerId+'&type='+type+'&role='+this.role+'&sid='+this.cookieStore.getCookie('sid'))
            .subscribe((data)=>{
                this.customerInfo = data;
                this.c_id = 0;
                if(this.customerInfo['status'] == 200 && (type == 'edit' || type == 'detail')) {
                    this.setValue(this.customerInfo);
                }else if(this.customerInfo['status'] == 202){
                    alert(this.customerInfo['msg']);
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }
                if(this.customerInfo['result']['c_follow_user_id'] != 0){
                    this.getDepartment(this.customerInfo['result']['c_follow_user_id'],2);
                }
            });
    }

    /**
     * 编辑冻龄智美客户收货地址
     * @param index
     */
    editCustomerAddr(index:number){
        this.edit_customer_addr['customer_addr_id'] = this.customerInfo['result']['customer_addr'][index]['customer_addr_id'];
        this.edit_customer_addr['customer_addr_name'] = this.customerInfo['result']['customer_addr'][index]['name'];
        this.edit_customer_addr['customer_addr_phone'] = this.customerInfo['result']['customer_addr'][index]['phone'];
        this.edit_customer_addr['province'] = this.customerInfo['result']['customer_addr'][index]['province'];
        this.edit_customer_addr['city'] = this.customerInfo['result']['customer_addr'][index]['city'];
        this.edit_customer_addr['area'] = this.customerInfo['result']['customer_addr'][index]['area'];
        this.edit_customer_addr['customer_address'] = this.customerInfo['result']['customer_addr'][index]['address'];
        this.edit_customer_addr['is_default'] = this.customerInfo['result']['customer_addr'][index]['is_default'];
    }

    /**
     * 删除用户收货地址
     * @param index
     */
    deleteCustomerAddr(index:number){
        let msg = '您确定要删除该收货地址吗？';
        if(confirm(msg)) {
            let url = 'deleteCustomerAddrById?addr_id=' + this.customerInfo['result']['customer_addr'][index]['customer_addr_id'] + '&sid=' + this.cookieStore.getCookie('sid');
            this.globalService.httpRequest('delete',url).subscribe((data) => {
                if(data['status'] == 202){
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }
                this.customerInfo['result']['customer_addr'].splice(index, 1);
            });
        }
    }

    /**
     * 提交修改的客户收货地址信息
     */
    submitEditCustomerAddr(){
        this.globalService.httpRequest('post','editCustomerAddr',{
            'customer_addr_id':this.edit_customer_addr['customer_addr_id'],
            'customer_addr_name':this.edit_customer_addr['customer_addr_name'],
            'customer_addr_phone':this.edit_customer_addr['customer_addr_phone'],
            'province':this.edit_customer_addr['province'],
            'city':this.edit_customer_addr['city'],
            'area':this.edit_customer_addr['area'],
            'customer_address':this.edit_customer_addr['customer_address'],
            'is_default':this.edit_customer_addr['is_default'],
            'sid':this.cookieStore.getCookie('sid')
        }).subscribe(
            (data)=>{
                // let info = JSON.parse(data['_body']);
                alert(data['msg']);
                if(data['status'] == 200) {
                    this.customerList = data;
                    this.selects = [];
                    for (let entry of this.customerList['result']['customerList']['data']) {
                        this.selects[entry['c_id']] = false;
                    }
                    this.check = false;
                }else if(data['status'] == 202){
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }
                this.editStatusCustomerId = 0;
                this.isStatus = 0;
            }
        );
    }

    /**
     * 删除信息
     * type id:单挑  all :多条
     */
    deleteCustomer(type:any){
        if(this.globalService.demoAlert('','')){
            return false;
        }
        let msg = '';
        let c_id : string = '';
        if(type == 'id'){
            c_id = this.editStatusCustomerId;
        } else if(type == 'all') {
            let is_select = 0;
            this.selects.forEach((val, idx, array) => {
                if (val == true) {
                    c_id += idx + ',';
                    is_select += 1;
                }
            });
            if (is_select < 1) {
                msg = '请确认已选中需要删除的信息！';
                alert(msg);
                return false;
            }
        }
        msg = '您确定要删除该信息吗？';
        if(confirm(msg)) {
            let url = 'deleteCustomerById?c_ids=' + c_id + '&role='+this.role+'&type='+type+'&sid=' + this.cookieStore.getCookie('sid');
            this.globalService.httpRequest('delete',url)
                .subscribe((data) => {
                    this.customerList = data;
                    if(this.customerList['status'] == 202){
                        this.cookieStore.removeAll(this.rollback_url);
                        this.router.navigate(['/auth/login']);
                    }
                    this.selects = [];
                    for (let entry of this.customerList['result']['customerList']['data']) {
                        this.selects[entry['c_id']] = false;
                    }
                    this.check = false;
                });
        }
    }

    /**
     * 顶部  启用. 无效
     */
    isStatusShow(c_id:any,status:any){
        this.editStatusCustomerId = c_id;
        this.isStatus = status;

        this.isAll = 0;
        this.width = '0%';
        this.width_1 ='80%';
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
        let c_id = '';
        if(type == 'all'){
            this.selects.forEach((val, idx, array) => {
                if(val == true){
                    c_id += idx+',';
                }
            });
        }else{
            c_id = this.editStatusCustomerId;
        }
        if(! c_id){
            alert('请确保已选中需要批量操作的项！');
            return false;
        }
        this.globalService.httpRequest('post','addCustomer',{
            'c_id':c_id,
            'c_status':status,
            'type':type,
            'role':this.role,
            'keyword':this.keyword.trim(),
            'sid':this.cookieStore.getCookie('sid')
        }).subscribe(
            (data)=>{
                // let info = JSON.parse(data['_body']);
                alert(data['msg']);
                if(data['status'] == 200) {
                    this.customerList = data;
                    this.selects = [];
                    for (let entry of this.customerList['result']['customerList']['data']) {
                        this.selects[entry['c_id']] = false;
                    }
                    this.check = false;
                }else if(data['status'] == 202){
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }
                this.editStatusCustomerId = 0;
                this.isStatus = 0;
            }
        );
    }
    /**
     * 批量
     */
    showAllCheck() {
        if(this.isAll == 0) {
            this.isAll = 1;
            this.editStatusCustomerId = 0;
            this.isStatus = 0;
            this.width = '10%';
            this.width_1 = '70%';
        }
    }

    @ViewChild('lgModal', { static: true }) public lgModal:ModalDirective;
    @ViewChild('detailModal', { static: true }) public detailModal:ModalDirective;

    /**
     * 获取单位分类信息
     */
    getUnitCategoryList(obj,num:number){
        let id = 0;
        if(num == 1){
            id = obj.target.value;
        }else{
            id = obj;
        }
        let url = 'getUnitCategoryList?category_type='+this.category_type+'&sid='+this.cookieStore.getCookie('sid');
        if(id != 0){
            url += '&category_tab='+id;
        }
        this.globalService.httpRequest('get',url)
            .subscribe((data)=>{
                this.unitCategoryList = data;
                if(this.unitCategoryList['status'] == 201){
                    alert(this.unitCategoryList['msg']);
                }else if(this.unitCategoryList['status'] == 202){
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }
            });
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