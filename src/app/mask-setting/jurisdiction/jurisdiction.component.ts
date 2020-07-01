import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {GlobalService} from "../../core/global.service";

@Component({
    selector: 'app-jurisdiction',
    templateUrl: './jurisdiction.component.html'
})
export class JurisdictionComponent implements OnInit {
    // dealer_setting_id : number = 0;
    phone : string='';
    level : number = 0;
    type:number = 1;
    satisfy_amount:string = '';
    amount:string = '';
    start_date:string = '';
    end_date:string = '';
  shareCodeImg:string = '';

    customerInfo:any = [];
    /**菜单id */
    menu_id:any;
    /** 权限 */
    permissions : Array<any> = [];
    menuInfos : any = [];
    rollback_url :string = '';
    constructor(
      private router : Router,
      private cookieStore:CookieStoreService,
      private globalService:GlobalService) {

    }

    ngOnInit() {
        //顶部菜单读取
        this.globalService.getMenuInfo();
        setTimeout(()=>{
            this.menu_id = this.globalService.getMenuId();
            this.rollback_url = this.globalService.getMenuUrl();
            this.permissions = this.globalService.getPermissions();
            this.menuInfos = this.globalService.getMenuInfos();
        },this.globalService.getMenuPermissionDelayTime());
    }

    /**
     * 获取用户详情
     * @param num
     */
    getInfo(){
        let url = 'getSettingCustomerInfo?phone='+this.phone+'&sid='+this.cookieStore.getCookie('sid');
        this.globalService.httpRequest('get',url)
          .subscribe((data)=>{
            console.log(data);
              this.customerInfo = data['result'];
              if(this.customerInfo) {
                this.type = this.customerInfo['type'];
                this.satisfy_amount = this.customerInfo['satisfy_amount'];
                this.amount = this.customerInfo['amount'];
                this.start_date = this.customerInfo['start_date'];
                this.end_date = this.customerInfo['end_date'];

              }
                  // this.dealer_setting_id = this.customerInfo['dealer_setting_id'];
                if (data['status'] == 202) {
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }else{
                  alert(data['msg']);
                }
          });
    }

  /**
   * 显示二维码
   */
  showCircleCode(){
    let url = 'getCircleQrcode?share_by='+this.customerInfo['c_number'];
    this.globalService.httpRequest('get',url)
      .subscribe((data)=>{
        console.log(data);
        this.shareCodeImg = data['result'];
      });
  }

    /**
     * 升级用户等级
     */
    upCustomerLevel(){
        this.globalService.httpRequest('post','upCustomer',{
            'customer_id':this.customerInfo['c_id'],
            'level':this.level,
            'sid':this.cookieStore.getCookie('sid')
        }).subscribe( (data)=>{
              alert(data['msg']);
              if(data['status'] == 200){
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
     * 设置客户发券功能
     */
    settingCustomerTicket(){
        this.globalService.httpRequest('post','ticketSettingToCustomer',{
            'dealer_setting_id':this.customerInfo['dealer_setting_id'],
            'customer_id':this.customerInfo['c_id'],
            'type':this.type,
            'satisfy_amount':this.satisfy_amount,
            'amount':this.amount,
            'start_date':this.start_date,
            'end_date':this.end_date,
            'sid':this.cookieStore.getCookie('sid')
        }).subscribe( (data)=>{
              alert(data['msg']);
              if(data['status'] == 200){
                  this.getInfo();
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
}