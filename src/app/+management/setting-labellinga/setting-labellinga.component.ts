import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {GlobalService} from "../../core/global.service";

@Component({
  selector: 'app-setting-labellinga',
  templateUrl: './setting-labellinga.component.html',
})
export class SettingLabellingaComponent implements OnInit {
    public states: Array<any>;
    public state: any = {
        tabs: {
            demo4: 'AA',
        },
    };
    categoryList : any = [];
    categoryInfo : any = [];
    category_id:number = 0;
    category_desc:string = '';
    color:string = '';

    //用作全选和反选
    selects : Array<any> = [];
    check : boolean = false;

    //顶部启动 和无效是否启用显示
    editStatusCategoryId : any = 0;
    //处理批量
    isAll : number = 0;
    width : string = '0%';
    width_1 : string = '100%';

    cid : any = 0;//当前登录用户的所属公司id
    super_admin_id : any = 0;//超级管理员所属公司id
    category_type : number = 16;
    rollback_url : string = '';
    /**菜单id */
    menu_id:any;
    /** 权限 */
    permissions : Array<any> = [];
  constructor(
      private router : Router,
      private cookieStore:CookieStoreService,
      private globalService:GlobalService) {

      this.getCategoryList('1');
      window.scrollTo(0,0);
      this.super_admin_id = this.globalService.getAdminID();
      this.cid = this.cookieStore.getCookie('cid');
  }

  ngOnInit() {
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


    /**
     * 获取标签列表  this.category_type
     * @param number
     */
    getCategoryList(number:string) {
        let url = 'getCategory?category_type='+this.category_type+'&page='+number+'&sid='+this.cookieStore.getCookie('sid');
        this.globalService.httpRequest('get',url)
            .subscribe((data)=>{
                this.categoryList = data;
                console.log(this.categoryList);
                if(this.categoryList['status'] == 202){
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }
            });
    }

    /**
     * 添加项目下任务标签信息
     */
    addCategory(){
        if(this.category_desc.trim() == ''){
            alert('请输入项目标题！');
            return false;
        }
        this.globalService.httpRequest('post','addCategory',{
            'category_id' : this.category_id,
            'category_type' : this.category_type,
            'category_desc' : this.category_desc,
            'category_tab' : this.color,
            'sid':this.cookieStore.getCookie('sid')
        }).subscribe((data)=>{
                if(data['status'] == 200) {
                    this.category_id = 0;
                    this.category_desc = '';
                    this.color = '';
                }else if(data['status'] == 202){
                    alert(data['msg']);
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }
                this.categoryList = data;
            }
        );
    }

    /**
     * 编辑标签信息
     */
    editCategory(type:any){
        this.globalService.httpRequest('get','getCategoryById?category_id='+this.editStatusCategoryId+'&number=1')
            .subscribe((data)=>{
                this.categoryInfo = data;
                this.category_id = this.categoryInfo['result']['parent']['category_id'];
                this.category_desc = this.categoryInfo['result']['parent']['category_desc'];
                this.color = this.categoryInfo['result']['parent']['category_tab'];
            });
    }

    /**
     * 删除项目标签信息
     */
    deleteCategory(type:any){
        if(this.editStatusCategoryId == 0 && type == 'id'){
            return false;
        }
        if(this.globalService.demoAlert('','')){
            return false;
        }
        let msg = '';
        let category_id : string = '';
        if(type == 'id'){
            category_id = this.editStatusCategoryId;
        } else if(type == 'all'){
            let is_select = 0;
            this.selects.forEach((val, idx, array) => {
                if(val == true){
                    category_id += idx+',';
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
            let url = 'deleteCategory?category_id=' + category_id + '&type='+type+'&number=1&category_type='+this.category_type+'&sid=' + this.cookieStore.getCookie('sid');
            this.globalService.httpRequest('delete',url)
                .subscribe((data) => {
                    this.categoryList = data;
                    if(this.categoryList['status'] == 202){
                        this.cookieStore.removeAll(this.rollback_url);
                        this.router.navigate(['/auth/login']);
                    }
                });
        }
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
     * 顶部  启用. 无效
     */
    isStatusShow(category_id:any){
        this.editStatusCategoryId = category_id;

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
    showAllCheck(){
        if(this.isAll == 0) {
            this.isAll = 1;
            this.editStatusCategoryId = 0;
            this.width = '10%';
            this.width_1 = '90%';
        }
    }
}
