import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GlobalService} from "../../core/global.service";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {ActivatedRoute, Params, Router,NavigationEnd} from "@angular/router";
import {ModalDirective} from "ngx-bootstrap";
import {isUndefined} from "util";
import {ProcessAlreadyComponent} from "./process-already/process-already.component";

@Component({
  selector: 'app-approval-process',
  templateUrl: './approval-process.component.html',
})
export class ApprovalProcessComponent implements OnInit,AfterViewInit {
    public state: any = {
        tabs: {
            demo5: 'iss1',
        },
    };

    tabs: Array<any> = [];
    /** 选中的审批者 */
    approve_user : Array<any> = [];
    submit_user_ids : Array<any> = [];
    selected_user : Array<any> = [];
    check : boolean = false;
    userList : any = [];
    userDefault : any = [];
    page : any;
    prev : boolean = false;
    next : boolean = false;
    //左侧选中部门的id
    select_department_ids: Array<any> = [];
    //左边展开和收起功能
    showUl : number  = 1;//一级分类
    showUlChild : number  = 0;//二级
    keyword:string = '';

    approvalInfo : any = [];
    approvalInfo_user_id:any = 0; //当前申请的创建者
    count_ : number = 0;//待我审批的个数
    isShowDetail : number = 0; //是否展示详情
    domain : string = '';
    uid:any = 0;
    operate_type : string = '';//操作弹框类型
    operate_button_type : string = '';//操作按钮类型
    content_operation : string = ''; //同意 拒绝 评论
    content_urge : string = '';//催办
    rollback_url: string = '';///process/approval-process/0

    select_propertys : string = '';

    params:any = '';
    a_ids:any = '';
    /**--------用选择图片的变量------*/
    select_type: string = '';
    show_big_pic: string = '';
    /**图片 */
    imgList : Array<any> = [];
    customer_name: string = '';
    /**菜单id */
    menu_id: any;
    /** 权限 */
    permissions: Array<any> = [];
    constructor(
                private router: Router,
                private routeInfo: ActivatedRoute,
                private cookieStore: CookieStoreService,
                private globalService:GlobalService) {

        this.domain = this.globalService.getDomain();
        this.uid = this.cookieStore.getCookie('uid');
    }

    ngOnInit() {
        //参数订阅,订阅后声明一个匿名函数来处理传递过来的参数，从参数取出id
        this.routeInfo.params.subscribe((params:Params)=>this.params=params["info"]);
        if(this.params != '' && this.params != '0'){
            if(this.params.indexOf('-') >= 0){
                let pr_ids_ = this.params.split('-');
                this.a_ids = pr_ids_[1];
                this.select_propertys = pr_ids_[0];
            }else{
                this.a_ids = this.params;
            }
            this.getStatus(this.a_ids,1);
            this.rollback_url += '/' + this.params;
        }else{
            this.rollback_url += '/0';
        }

        this.tabs.push('iss1');
        this.getUserDefault();
        //顶部菜单读取
        this.globalService.getMenuInfo();
        setTimeout(() => {
            this.menu_id = this.globalService.getMenuId();
            this.rollback_url = this.globalService.getMenuUrl();
            this.permissions = this.globalService.getPermissions();
        }, this.globalService.getMenuPermissionDelayTime())
    }


    //钩子
    ngAfterViewInit(){
        // 监听路由变化
    this.router.events
        .filter((event) => event instanceof NavigationEnd)
        .subscribe((event:NavigationEnd) => {
            let url = event['url'];
            let param = url.split('/');
            this.params = param[param.length - 1];
            if (this.params != '' && this.params != '0') {
                if (this.params.indexOf('-') >= 0) {
                    let pr_ids_ = this.params.split('-');
                    this.a_ids = pr_ids_[1];
                    this.select_propertys = pr_ids_[0];
                } else {
                    this.a_ids = this.params;
                }
                this.getStatus(this.a_ids, 1);
                this.rollback_url += '/' + this.params;
            } else {
                this.rollback_url += '/0';
            }
        });
    }

    /**
     * 获取默认参数
     */
    getUserDefault() {
        this.globalService.httpRequest('get','getUserDefault?type=list&sid=' + this.cookieStore.getCookie('sid'))
        .subscribe((data) => {
            this.userDefault = data;
            if (this.userDefault['status'] == 202) {
                alert(this.userDefault['msg']);
                this.cookieStore.removeAll(this.rollback_url);
                this.router.navigate(['/auth/login']);
            }
            this.select_department_ids[0] = true;
            this.userDefault['result']['departmentList'].forEach((val, idx, array) => {
                this.select_department_ids[val['department_id']] = true;
                if (val['has_child'] >= 1) {
                    val['child'].forEach((val1, idx1, array1) => {
                        this.select_department_ids[val1['department_id']] = true;
                    });
                }
            });
        });
    }

    @ViewChild('ProcessAlreadyComponent', { static: false })ProcessAlreadyComponent:ProcessAlreadyComponent;
    /**
     * 展示tab
     * @param type
     */
    showTab(type:string){
        this.state.tabs.demo5 = type;
        if(!this.cookieStore.in_array(type,this.tabs)){
            this.tabs.push(type);
        }
        // this.ProcessAlreadyComponent.getProcessHadList('1');
    }

    /**
     * 是否有该元素
     */
    isInTabs(key) {
        return this.cookieStore.in_array(key, this.tabs);
    }
    /**
     * 获取用户列表
     * @param number
     */
    getUserList(number:string,department_id:any) {
        if(this.userList.length == 0 && this.keyword.trim() == '') {
            let url = 'getUserList?page=' + number + '&sid=' + this.cookieStore.getCookie('sid');
            if (this.keyword.trim() != '') {
                url += '&keyword=' + this.keyword.trim();
            }
            if (department_id != 0) {
                url += '&depart=' + department_id;
            } else {
                let depart = '';
                this.select_department_ids.forEach((val, idx, array) => {
                    if (val == true) {
                        depart += idx + ',';
                    }
                });

                url += '&depart=' + depart;
            }
            this.globalService.httpRequest('get',url)
                .subscribe((data) => {
                    this.userList = data;
                    if (this.userList['status'] == 202) {
                        this.cookieStore.removeAll(this.rollback_url);
                        this.router.navigate(['/auth/login']);
                    }
                    //服务器返回html正确解析输出
                    // this.pageHtml = this.sanitizer.bypassSecurityTrustHtml(this.userList['page']);
                    this.submit_user_ids = [];
                    if (this.userList) {
                        if (this.userList['result']['userList']['current_page'] == this.userList['result']['userList']['last_page']) {
                            this.next = true;
                        } else {
                            this.next = false;
                        }
                        if (this.userList['result']['userList']['current_page'] == 1) {
                            this.prev = true;
                        } else {
                            this.prev = false;
                        }
                        if (this.userList['result']['userList']) {
                            for (let entry of this.userList['result']['userList']['data']) {
                                this.submit_user_ids[entry['id']] = false;
                            }
                        }
                        this.check = false;
                    }
                });
        }
    }

    getData(value:any){
        this.count_ = value;
    }

    showPage(id){
        let url = '';
        if(this.select_propertys == 'purchase_sale') {
            url = '/sales-management/add-sales/'+id+'_detail';
        }else if(this.select_propertys == 'purchase_cg_after') {
            url = '/procurement-management/add-receipt/'+id+'_detail';
        }else if(this.select_propertys == 'otherorder_in') {
            url = '/inventory-management/add-storage/'+id+'_detail';
        }else if(this.select_propertys == 'otherorder_out') {
            url = '/inventory-management/add-outbound/'+id+'_detail';
        }else if(this.select_propertys == 'stockallot') {
            url = '/inventory-management/add-requisition/'+id+'_detail';
        }else if(this.select_propertys == 'assets_ff') {
            url = '/assets-management/assets-issue';
        }else if(this.select_propertys == 'assets_bf') {
            url = '/assets-management/assets-scrap';
        }
        this.router.navigate([url]);
    }

    //修改状态并获取详情
    getStatus(value:any,num){
        if(num == 0){
            let values = JSON.parse(value) ;
            this.isShowDetail = values['id'];
            this.select_propertys = values['property'];
        }else{
            this.isShowDetail = value;
        }
        let url = '';
        if(this.select_propertys == 'approval') {
            url = url = 'getApprovalInfo?approval_id='+this.isShowDetail+'&sid=' + this.cookieStore.getCookie('sid');
        }else if(this.select_propertys == 'purchase_cg_after' || this.select_propertys == 'purchase_sale') {
            url = 'getPurchaseInfo?pr_id=' + this.isShowDetail + '&select_property='+this.select_propertys+'&sid=' + this.cookieStore.getCookie('sid');
        }else if(this.select_propertys == 'otherorder_in' || this.select_propertys == 'otherorder_out') {
            url = 'getOtherorderInfo?otherorder_id=' + this.isShowDetail + '&select_property='+this.select_propertys+'&sid=' + this.cookieStore.getCookie('sid');
        }else if(this.select_propertys == 'stockallot') {
            url = 'getStockallotInfo?stock_allot_id=' + this.isShowDetail + '&select_property='+this.select_propertys+'&sid=' + this.cookieStore.getCookie('sid');
        }else if(this.select_propertys == 'assets_ff' || this.select_propertys == 'assets_bf') {
            url = 'getAssetsInfo?assets_id=' + this.isShowDetail +'&select_property='+this.select_propertys+'&sid=' + this.cookieStore.getCookie('sid');
        }
        this.globalService.httpRequest('get',url)
            .subscribe((data) => {
                this.approvalInfo = data;
                this.approvalInfo_user_id = this.approvalInfo['result']['u_id'];
                if (this.approvalInfo['status'] == 202) {
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }
            });
    }


    closeDetail(){
        this.isShowDetail = 0;
        this.approvalInfo = [];

    }


    // <!-- Modal 审批同意意见  审批拒绝意见   评论-->
    @ViewChild('operationModel', { static: true }) public operationModel: ModalDirective;
    // <!-- 撤销 -->
    @ViewChild('cancelModel', { static: true }) public cancelModel: ModalDirective;
    // <!-- 催办 -->
    @ViewChild('urgeModel', { static: true }) public urgeModel: ModalDirective;
    // <!-- 转交- -->
    @ViewChild('transferModel', { static: true }) public transferModel: ModalDirective;

    /**
     * 显示操作弹出框
     * @param type
     */
    public showModal(type:string,type1:string): void {
        this.operate_type = type;
        this.operate_button_type = type1;
        if(type == 'operation'){
            this.operationModel.show();
        }else if(type == 'cancel'){
            this.cancelModel.show();
        }else if(type == 'urge'){
            this.urgeModel.show();
        }else if(type == 'transfer'){
            this.transferModel.show();
            this.getUserList('1',0);
        }
    }

    public hideModal(): void {
        if(this.operate_type == 'operation'){

            this.operationModel.hide();
        }else if(this.operate_type == 'cancel'){

            this.cancelModel.hide();
        }else if(this.operate_type == 'urge'){

            this.urgeModel.hide();
        }else if(this.operate_type == 'transfer'){

            this.selected_user = [];
            this.submit_user_ids = [];

            this.transferModel.hide();
        }
        this.operate_type = '';
        this.operate_button_type = '';
    }


    /**
     * 提交转交人的选择
     */
    submitSelectedUser(){
        this.approve_user = [];
        this.submit_user_ids.forEach((val1, idx1, array1) => {
            this.userList['result']['userList']['data'].forEach((val, idx, array) => {
                if(val['id'] == val1 && val1 != false){
                        this.approve_user.push(val);
                }
            });
        });
        this.selected_user = [];
        this.submit_user_ids = [];
    }

    /**
     * 提交设置的信息
     * @param type
     */
    setModal(){

        let content = '';
        if (this.operate_button_type == 'ok' || this.operate_button_type == 'no' || this.operate_button_type == 'comment') {
            content = this.content_operation;
        }
        if(this.select_propertys == 'approval') {
            let id = '';
            if (this.operate_button_type == 'transfer') {
                this.submit_user_ids.forEach((val, idx, array) => {
                    if (val != true && val != false) {
                        id += '"' + val + '",';
                    }
                });
            } else if (this.operate_button_type == 'urge') {
                content = this.content_urge;
            }

            this.globalService.httpRequest('post','addLog', {
                'other_id': this.isShowDetail,
                'other_table_name': 'approval',
                'log_type': 'approval',
                'log_operation_type': this.operate_button_type,
                'log_detail': content,
                'log_uid': id,
                'create_user_id': this.approvalInfo_user_id,
                'u_id': this.cookieStore.getCookie('uid'),
                'sid': this.cookieStore.getCookie('sid')
            }).subscribe((data) => {
                if (data['status'] == 200) {
                    this.getStatus(this.isShowDetail,1);
                    this.hideModal();
                } else if (data['status'] == 202) {
                    alert(data['msg']);
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                } else if (data['status'] == 9999) {
                    alert(data['msg']);
                }
            });
        }else{
            let url = '';
            let other_table_name = '';
            if(this.select_propertys == 'purchase_sale' || this.select_propertys == 'purchase_cg_after'){
                url = 'addLog';
                other_table_name = 'purchase';
            }else if(this.select_propertys == 'stockallot'){
                url = 'addStockAllotLog';
                other_table_name = 'stockallot';
            }else if(this.select_propertys == 'otherorder_in' || this.select_propertys == 'otherorder_out'){
                url = 'addOtherorderLog';
                other_table_name = 'otherorder';
            }else if(this.select_propertys == 'assets_ff' || this.select_propertys == 'assets_bf'){
                url = 'addAssetsLog';
                other_table_name = 'assets';
            }
            this.globalService.httpRequest('post',url, {
                'other_id': this.isShowDetail,
                'other_table_name': other_table_name,
                'log_type': this.select_propertys,
                'log_operation_type': this.operate_button_type,
                'log_detail': content,
                'create_user_id': this.approvalInfo_user_id,
                'u_id': this.cookieStore.getCookie('uid'),
                'sid': this.cookieStore.getCookie('sid')
            }).subscribe((data) => {
                if (data['status'] == 200) {
                    this.getStatus(this.isShowDetail,1);
                    this.hideModal();
                } else if (data['status'] == 202) {
                    alert(data['msg']);
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                } else if (data['status'] == 9999) {
                    alert(data['msg']);
                }
            });
        }
    }

    /**
     * 左边选中所有
     */
    selectDepartmentAll(){
        if(this.select_department_ids[0] == true){
            this.select_department_ids[0] = false;
            this.userDefault['result']['departmentList'].forEach((val, idx, array) => {
                this.select_department_ids[val['department_id']] = false;
                if (val['has_child'] >= 1) {
                    val['child'].forEach((val1, idx1, array1) => {
                        this.select_department_ids[val1['department_id']] = false;
                    });
                }
            });
        }else {
            this.select_department_ids[0] = true;
            this.userDefault['result']['departmentList'].forEach((val, idx, array) => {
                this.select_department_ids[val['department_id']] = true;
                if (val['has_child'] >= 1) {
                    val['child'].forEach((val1, idx1, array1) => {
                        this.select_department_ids[val1['department_id']] = true;
                    });
                }
            });
        }
        let depart = '';
        this.select_department_ids.forEach((val, idx, array) => {
            if(val == true) {
                depart += idx + ',';
            }
        });
        this.getUserList('1',depart);
    }

    /**
     * 左侧导航栏 选中显示列表
     * @param department_id
     * index 点击的父类 or子类 索引
     * num  1：父类 2：子类
     */
    selectDepartment(department_id:any,index:number,indexChild:number,num:number){
        if(num == 1){//点击父类
            if(this.select_department_ids[department_id] == true){
                if(this.userDefault['result']['departmentList'][index]){
                    if(this.userDefault['result']['departmentList'][index]['has_child'] >= 1){
                        this.userDefault['result']['departmentList'][index]['child'].forEach((val, idx, array) => {
                            this.select_department_ids[val['department_id']] = false;
                        });
                    }
                }
                this.select_department_ids[department_id] = false;
            }else{
                this.select_department_ids[department_id] = true;

                if(this.userDefault['result']['departmentList'][index]){
                    if(this.userDefault['result']['departmentList'][index]['has_child'] >= 1){
                        this.userDefault['result']['departmentList'][index]['child'].forEach((val, idx, array) => {
                            this.select_department_ids[val['department_id']] = true;
                        });
                    }
                }
            }
        }else if(num != 1){//点击子类
            if(this.select_department_ids[department_id] == true){
                this.select_department_ids[num] = false;
                this.select_department_ids[department_id] = false;
            }else{
                this.select_department_ids[department_id] = true;

                let count = 0;
                if(this.userDefault['result']['departmentList'][index]){
                    if(this.userDefault['result']['departmentList'][index]['has_child'] >= 1){
                        this.userDefault['result']['departmentList'][index]['child'].forEach((val, idx, array) => {
                            if(this.select_department_ids[val['department_id']] == false ||  isUndefined(this.select_department_ids[val['department_id']])){
                                count ++;
                            }
                        });
                    }
                }
                if(count == 0){//若子类全是true则父类变为选中状态
                    this.select_department_ids[num] = true;
                }
            }
        }
        let depart = '';
        this.select_department_ids.forEach((val, idx, array) => {
            if(val == true) {
                depart += idx + ',';
            }
        });
        this.leftIsAll(); //左边是否全选
        this.getUserList('1',depart);
    }

    /**
     * 左边是否被全选
     */
    leftIsAll(){
        let isAll = 0;
        this.userDefault['result']['departmentList'].forEach((val, idx, array) => {
            if(this.select_department_ids[val['department_id']] == false){
                isAll ++;
            }
        });
        if(isAll == 0){
            this.select_department_ids[0] = true;
        }else{
            this.select_department_ids[0] = false;
        }
    }


    /**
     * 左边展示效果
     * @param bool
     */
    showLeftUl(bool:any){
        this.showUl = bool;
    }
    showLeftUlChild(department_id:any){
        this.showUlChild = department_id;
    }


    //全选，反全选
    changeCheckAll(e){
        let t = e.target;
        let c = t.checked;
        this.submit_user_ids = [];
        this.selected_user.forEach((val, idx, array) => {
            this.selected_user[idx] = c;
            this.submit_user_ids.push(idx);
        });
        this.check = c;
    }

    /**
     * 点击列表checkbox事件
     */
    handle(e) {
        let t = e.target;
        let v = t.value;
        let c = t.checked;
        this.selected_user[v] = c;
        if(c == true) {
            this.submit_user_ids.push(v);
        }else{
            this.submit_user_ids.forEach((val, idx, array) => {
                if(val == v){
                    this.submit_user_ids.splice(idx,1);
                }
            });
        }
        let isAll = 0;
        for (let s of this.selected_user) {
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

    pagination(page : any) {
        this.page = page;
        this.getUserList(this.page,0);
    }




    //-----------------图片选择弹框 ---------------
    showSelectFileDiv(){
        this.select_type = 'file';
    }

    getSelectTypes(){
        this.select_type = '';
    }

    getImgLists(value:any){
        this.imgList = JSON.parse(value);
    }

    showBigPic(imgUrl:string){
        this.select_type = 'bigPic'
        this.show_big_pic = imgUrl;
    }

}
