import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieStoreService} from '../../shared/cookies/cookie-store.service';
import {GlobalService} from '../../core/global.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
})
export class SingleProductComponent implements OnInit {
  productList:any = [];
  errorCode:any = [];   //未录入的一维码
  code:string = '';
  count:string = '';
  isShowCount:boolean = false;
  isShowErrorCode:boolean = false;

  xy_details: boolean = false;  //单击展开，再次单击隐藏

  //用作全选和反选
  selects : Array<any> = [];
  check : boolean = false;
  page : any;
  prev : boolean = false;
  next : boolean = false;

  type:number=1;
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
    this.getProductList(1);
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

    //单击展开，再次单击隐藏
    changedetails(){
        this.xy_details = !this.xy_details;
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
    if(this.code.indexOf('690708216') == 0 || this.code.indexOf('690708217') == 0){
      this.type = (this.code.indexOf('690708216') == 0) ? 3 : 2;
      this.isShowCount = true;
    }else if(this.code.indexOf('690708218') == 0){
      this.type = 1;
      this.isShowCount = true;
    }else {
      this.isShowCount = false;
    }
  }  /**
 * 分页
 */
pagination(page : string) {
  this.page = page;
  this.getProductList(this.page);
}

  /**
   * 获取列表
   */
  getProductList(number:number) {
    let url = 'getFrozenoProductList?page='+number+'&sid='+this.cookieStore.getCookie('sid');
    this.globalService.httpRequest('get',url)
      .subscribe((data)=>{
        this.productList = data;
        if(this.productList['status'] == 202){
          this.cookieStore.removeAll(this.rollback_url);
          this.router.navigate(['/auth/login']);
        }
        if (this.productList) {
          if (this.productList['result']['products']['current_page'] == this.productList['result']['products']['last_page']) {
            this.next = true;
          } else {
            this.next = false;
          }
          if (this.productList['result']['products']['current_page'] == 1) {
            this.prev = true;
          } else {
            this.prev = false;
          }
          this.selects = [];
          for (let entry of this.productList['result']['products']['data']) {
            this.selects[entry['fp_id']] = false;
          }
          this.check = false;
        }
      });
  }

  /**
   * 录入单品
   */
  onSubmit(){
    if(this.code.trim() == ''){
      alert('请扫入编号！');
      return false;
    }
    if(this.code.length > 13 && this.type != 1){
      alert("精华或导入仪的单品入库时，请做到一码一数量，再入库。");
      return false;
    }
    let category_id=0;
    if(this.code.indexOf('690708218') == 0){   //单品面膜装  690708210
      category_id = this.globalService.mm_category_id;
      this.type = 1;
    }else if(this.code.indexOf('690708216') == 0){  //单品导入仪
      category_id = this.globalService.dry_category_id;
    }else if(this.code.indexOf('690708217') == 0){   //单品精华
      category_id = this.globalService.jh_category_id;
    }else{
      alert('不存在此单品，无法入库！');
      return false;
    }
    this.globalService.httpRequest('post','addFrozenoProduct',{
      'code' : this.code,
      'count' : this.count,
      'category_id' :category_id,
      'state' : 0,
      'type' : this.type,
      'u_id' : this.cookieStore.getCookie('uid'),
      'sid':this.cookieStore.getCookie('sid')
    }).subscribe((data)=>{
        if(data['status'] == 201){
          alert(data['msg']);
          return false;
        }else if(data['status'] == 200){
          this.productList = data;
          this.errorCode = data['errorCode'];
          if(this.errorCode.length > 0){
            this.isShowErrorCode = true;
          }
        }else if(data['status'] == 202){
          this.cookieStore.removeAll(this.rollback_url);
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }

  /**
   * 关闭未录入信息
   */
  close(){
    this.isShowErrorCode = false;
    this.errorCode = [];
  }

}
