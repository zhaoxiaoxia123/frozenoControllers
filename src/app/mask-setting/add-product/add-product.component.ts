import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {GlobalService} from "../../core/global.service";
import {ModalDirective} from "ngx-bootstrap";
import {isUndefined} from "util";
import {NotificationService} from "../../shared/utils/notification.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
    encapsulation: ViewEncapsulation.None, //在于不让angular4样式生效
    styleUrls: ['./add-product.scss']
})
export class AddProductComponent implements OnInit {
    page : any;
    prev : boolean = false;
    next : boolean = false;

    productDefault : any = [];
    select_category_ids: Array<any> = [];
    showUl : number  = 1;//一级分类
    showUlChild : number  = 0;//二级
    //处理批量
    isAll : number = 0;
    width : string = '0%';
    width_1 : string = '80%';

    productList : any = [];
    //用作全选和反选
    selects : Array<any> = [];
    check : boolean = false;
    isStatus : any = 0;

    p_state:number = 0; //未入库
    p_type:number = 4; //冻龄智美商品
    code:string = '';

    oneCode:string = '';
    qrCode:string = '';
    category_index:number = 0;
    add_product_count:number = 0; //当前箱子下需入库的商品个数
    mm_code:string = '';
    jh_code:string = '';
    jh_count:string = '0';
    dry_code:string = '';
    dry_count:string = '0';
    showSubmit:boolean = true;

    categoryList:any = [];

    category_type : number = 50;
    rollback_url : string = '';
    url : string = this.globalService.getDomain();
    tempDomain:string = '';
    /**菜单id */
    menu_id:any;
    /** 权限 */
    permissions : Array<any> = [];
    menuInfos : any = [];
    constructor(
        private router : Router,
        private cookieStore:CookieStoreService,
        private globalService:GlobalService,
        private notificationService: NotificationService) {
        window.scrollTo(0,0);
        this.getProductDefault();
        this.getCategoryList();
        this.tempDomain = this.globalService.tempDomain;
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
     * 获取默认参数
     */
    getProductDefault(){
        this.globalService.httpRequest('get','getProductLeftCategory?category_type='+this.category_type+'&sid='+this.cookieStore.getCookie('sid'))
          .subscribe((data)=>{
              this.productDefault = data;
              if(this.productDefault['status'] == 202){
                  alert(this.productDefault['msg']);
                  this.cookieStore.removeAll(this.rollback_url);
                  this.router.navigate(['/auth/login']);
              }
              this.select_category_ids[0] = true;
              this.productDefault['result'].forEach((val, idx, array) => {
                  this.select_category_ids[val['category_id']] = true;
                  if(val['child_count'] >= 1){
                      val['child'].forEach((val1, idx1, array1) => {
                          this.select_category_ids[val1['category_id']] = true;
                      });
                  }
              });
              let depart = '';
              this.select_category_ids.forEach((val, idx, array) => {
                  if(val == true) {
                      depart += idx + ',';
                  }
              });
              this.getScanProductList('1',depart);
          });
    }

    //获取入库为完成的商品列表信息
    getScanProductList (page:string,category_id:any) {
        // if(!this.select_property){
        //     this.select_property = '0';
        // }
        let url = 'getScanProductList?state='+this.p_state+'&code='+this.code+'&p_type='+this.p_type+'&page='+page+'&sid='+this.cookieStore.getCookie('sid');
        if(category_id != 0){
            url += '&category_ids='+category_id;
        }else{
            let category_ids = '';
            this.select_category_ids.forEach((val, idx, array) => {
                if(val == true) {
                    category_ids += idx + ',';
                }
            });
            url += '&category_ids='+category_ids;
        }
        this.globalService.httpRequest('get',url)
        .subscribe((data)=>{
            this.productList = data;
            if(this.productList['status'] == 202){
              alert(this.productList['msg']);
              this.cookieStore.removeAll(this.rollback_url);
              this.router.navigate(['/auth/login']);
            }
            if(this.productList.length > 0){
                if (this.productList['result']['current_page'] == this.productList['result']['last_page']) {
                    this.next = true;
                } else {
                    this.next = false;
                }
                if (this.productList['result']['current_page'] == 1) {
                    this.prev = true;
                } else {
                    this.prev = false;
                }
                this.selects = [];
                for (let entry of this.productList['result']['data']) {
                    this.selects[entry['p_id']] = false;
                }
                this.check = false;
            }
        });
    }

    /**
     * 查询入库包装类型
     */
    getCategoryList() {
        this.globalService.httpRequest('get','getCategoryList?category_type=50&sid='+this.cookieStore.getCookie('sid'))
            .subscribe((data)=>{
                this.categoryList = data['result']['productList'];
                console.log(this.categoryList);
                if(data['status'] == 202){
                    alert(data['msg']);
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }
        });
    }

    changeType(){
        let count = this.categoryList[this.category_index]['frozeno_child_count'];
        if(count > 0){
            this.add_product_count = count;
        }else{
            alert('该二维码下未设置装入单品数量。');
        }
    }

    /**
     * 计算当前入库商品个数是否和包装类型符合
     */
    sumCount(){
        let mml = this.mm_code.length;
        let count_ = (mml/13) + parseInt(this.jh_count) + parseInt(this.dry_count);
        console.log((count_));
        console.log(this.add_product_count);
        if((count_) == this.add_product_count){
            this.showSubmit = false;
        }
        console.log(this.showSubmit );
    }


    /**
     * 添加信息
     */
    onSubmitProduct(){
        if(this.oneCode.trim() == ''){
            alert('请扫入盒子一维码！');
            return false;
        }
        if(this.qrCode.trim() == ''){
            alert('请扫入盒子二维码！');
            return false;
        }
        if(this.category_index == 0){
            alert('请选择包装类型！');
            return false;
        }
        this.globalService.httpRequest('post','putAdminProduct',{
            // 'p_id' : this.p_id,
            'product_code' : this.oneCode,
            'category_id' : this.categoryList[this.category_index]['category_id'],
            'qrCode' : this.qrCode,
            'mm_code' : this.mm_code,
            'jh_code' : this.jh_code,
            'jh_count' : this.jh_count,
            'dry_code' : this.dry_code,
            'dry_count' : this.dry_count,
            'state' : 4,
            'u_id' : this.cookieStore.getCookie('uid'),
            'sid':this.cookieStore.getCookie('sid')
        }).subscribe((data)=>{
              if(data['status'] == 201){
                  alert(data['msg']);
                  return false;
              }else if(data['status'] == 200) {
                  this.clear_();
                  this.lgModal.hide();
              }else if(data['status'] == 202){
                  this.cookieStore.removeAll(this.rollback_url);
                  this.router.navigate(['/auth/login']);
              }
          }
        );
    }
    /**
     * 左边选中所有
     */
    selectCategoryAll(){
        if(this.select_category_ids[0] == true){
            this.select_category_ids[0] = false;
            this.productDefault['result'].forEach((val, idx, array) => {
                this.select_category_ids[val['category_id']] = false;
                if (val['has_child'] >= 1) {
                    val['child'].forEach((val1, idx1, array1) => {
                        this.select_category_ids[val1['category_id']] = false;
                    });
                }
            });
        }else {
            this.select_category_ids[0] = true;
            this.productDefault['result'].forEach((val, idx, array) => {
                this.select_category_ids[val['category_id']] = true;
                if (val['has_child'] >= 1) {
                    val['child'].forEach((val1, idx1, array1) => {
                        this.select_category_ids[val1['category_id']] = true;
                    });
                }
            });
        }
        let depart = '';
        this.select_category_ids.forEach((val, idx, array) => {
            if(val == true) {
                depart += idx + ',';
            }
        });
        this.getScanProductList('1',depart);
    }
    /**
     * 左边展示效果
     * @param bool
     */
    showLeftUl(bool:any){
        this.showUl = bool;
    }
    showLeftUlChild(category_id:any){
        this.showUlChild = category_id;
    }
    /**
     * 页码分页
     * @param page
     */
    pagination(page : any) {
        this.page = page;
        this.getScanProductList(this.page,0);
    }
    //
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
     * 左侧导航栏 选中显示列表
     * @param category_id
     * index 点击的父类 or子类 索引
     * num  1：父类 2：子类
     */
    selectDepartment(category_id:any,index:number,indexChild:number,num:number,type:string){
        if(num == 1){//点击父类
            if(this.select_category_ids[category_id] == true){
                if(this.productDefault['result'][index]){
                    if(this.productDefault['result'][index]['child_count'] >= 1){
                        this.productDefault['result'][index]['child'].forEach((val, idx, array) => {
                            this.select_category_ids[val['category_id']] = false;
                        });
                    }
                }
                this.select_category_ids[category_id] = false;
            }else{
                this.select_category_ids[category_id] = true;
                if(this.productDefault['result'][index]){
                    if(this.productDefault['result'][index]['child_count'] >= 1){
                        this.productDefault['result'][index]['child'].forEach((val, idx, array) => {
                            this.select_category_ids[val['category_id']] = true;
                        });
                    }
                }
            }
        }else if(num != 1){//点击子类
            if(this.select_category_ids[category_id] == true){
                this.select_category_ids[num] = false;
                this.select_category_ids[category_id] = false;
            }else{
                this.select_category_ids[category_id] = true;

                let count = 0;
                if(this.productDefault['result'][index]){
                    if(this.productDefault['result'][index]['child_count'] >= 1){
                        this.productDefault['result'][index]['child'].forEach((val, idx, array) => {
                            if(this.select_category_ids[val['category_id']] == false ||  isUndefined(this.select_category_ids[val['category_id']])){
                                count ++;
                            }
                        });
                    }
                }
                if(count == 0){//若子类全是true则父类变为选中状态
                    this.select_category_ids[num] = true;
                }
            }
        }
        let depart = '';
        this.select_category_ids.forEach((val, idx, array) => {
            if(val == true) {
                depart += idx + ',';
            }
        });
        // this.editStatusProductId = 0;
        // this.isStatus = 0;
        this.getScanProductList('1',depart);
    }

    /**
     * 重置
     */
    clear_(){
        this.oneCode = '';
        this.qrCode = '';
        this.category_index = 0;
        this.add_product_count = 0;
        this.mm_code = '';
        this.jh_code = '';
        this.jh_count = '0';
        this.dry_code = '';
        this.dry_count = '0';
        this.showSubmit = true;
    }

    @ViewChild('lgModal', { static: true }) public lgModal:ModalDirective;

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

