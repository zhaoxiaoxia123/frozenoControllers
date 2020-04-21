import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieStoreService} from '../../shared/cookies/cookie-store.service';
import {GlobalService} from '../../core/global.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
})
export class SingleProductComponent implements OnInit {
  code:string = '';
  count:string = '';
  isShowCount:boolean = false;

  uid:string;
  rollback_url:string;
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

  isShowCountDiv(){
    if(this.code.indexOf('96') == 0){
      this.isShowCount = true;
    }else{
      this.isShowCount = false;
    }
  }
  /**
   * 录入单品
   */
  addSingleProduct(){
    if(this.count){

    }
  }

  /**
   * 获取列表
   * @param number
   */
  getPurchaseList(number:string) {
    // let url = 'getProductList?pr_type='+this.type+'&page='+number+'&sid='+this.cookieStore.getCookie('sid');
    // if(this.keyword.trim() != '') {
    //   url += '&keyword='+this.keyword.trim();
    // }
    // this.globalService.httpRequest('get',url)
    //   .subscribe((data)=>{
    //     this.purchaseList = data;
    //     if(this.purchaseList['status'] == 202){
    //       this.cookieStore.removeAll(this.rollback_url);
    //       this.router.navigate(['/auth/login']);
    //     }
    //     if (this.purchaseList) {
    //       if (this.purchaseList['result']['purchaseList']['current_page'] == this.purchaseList['result']['purchaseList']['last_page']) {
    //         this.next = true;
    //       } else {
    //         this.next = false;
    //       }
    //       if (this.purchaseList['result']['purchaseList']['current_page'] == 1) {
    //         this.prev = true;
    //       } else {
    //         this.prev = false;
    //       }
    //       this.selects = [];
    //       for (let entry of this.purchaseList['result']['purchaseList']['data']) {
    //         this.selects[entry['pr_id']] = false;
    //       }
    //       this.check = false;
    //     }
    //   });

  }

}
