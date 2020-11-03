import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {GlobalService} from "../../core/global.service";
import {ModalDirective} from "ngx-bootstrap/modal";

@Component({
    selector: 'app-dealer-money',
    styleUrls: ['./dealer-money.css'],
    templateUrl: './dealer-money.component.html'
})
export class DealerMoneyComponent implements OnInit {
    //顶部按钮是否启用显示
    editLogId : any = 0;
    logList : any = [];
    logInfo : any = [];
    keyword:string = '';
    date:string = '';
    income : any = [];

    datePickerConfig = {
        locale: 'zh-CN',
        format:'YYYY-MM',
        enableMonthSelector:true,
        showMultipleYearsNavigation:true,
    };

    c_id:string;
    rollback_url : string = '';
    /**菜单id */
    menu_id:any;
    /** 权限 */
    permissions : Array<any> = [];
    menuInfos : any = [];
    constructor(
      private router:Router,
      private cookieStore:CookieStoreService,
      private globalService:GlobalService) {
        this.getCustomerIncome();
        window.scrollTo(0,0);
        this.c_id = this.cookieStore.getCookie('cid');
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
        this.getLogList(1);
    }

    /**
     * 获取用户可提现金额和未入账金额
     */
    getCustomerIncome() {
        let url = 'getDealerAmount?sid='+this.cookieStore.getCookie('sid');
        this.globalService.httpRequest('get',url)
          .subscribe((data)=>{
          if(data) {
              this.income = data['result'];
              if (data['status'] == 202) {
                  this.cookieStore.removeAll(this.rollback_url);
                  this.router.navigate(['/auth/login']);
              }
          }
        });
    }

    /**
     * 顶部  启用. 无效
     */
    isStatusShow(log_id:any) {
        this.editLogId = log_id;
    }
    //搜索
    searchKeyword(){
        let year = 0;
        let month = 0;
        let dInfo = [];
        if(this.date){
            dInfo = this.date.split('-');
            year = dInfo[0];
            month = dInfo[1];
        }
        this.getLogList(1,year,month);
    }

    /**
     * 获取我的账户收支列表信息列表
     * @param num
     */
    getLogList(num:number,year=0,month=0){
        let url = 'getDealerLogList?page='+num+'&sid='+this.cookieStore.getCookie('sid');
        if(this.keyword != ''){
            url += '&keyword='+this.keyword;
        }
        if(year != 0){
            url += '&year='+year;
        }
        if(month != 0){
            url += '&month='+month;
        }
        this.globalService.httpRequest('get',url)
          .subscribe((data)=>{
              this.logList = data['result'];
              if(this.logList) {
                  if (this.logList['status'] == 202) {
                      this.cookieStore.removeAll(this.rollback_url);
                      this.router.navigate(['/auth/login']);
                  }
              }
          });
    }


    getLogInfo(){
        let url = 'getDealerLogInfo?log_id='+this.editLogId+'&sid='+this.cookieStore.getCookie('sid');
        this.globalService.httpRequest('get',url)
          .subscribe((data)=>{
              this.logInfo = data['result'];
              if(this.logInfo) {
                  if (this.logInfo['status'] == 202) {
                      this.cookieStore.removeAll(this.rollback_url);
                      this.router.navigate(['/auth/login']);
                  }else{
                      this.lgModal.show();
                  }
              }
          });
    }

    closeDiv(){
        this.lgModal.hide();
    }

    @ViewChild('lgModal', { static: true }) public lgModal:ModalDirective;
}