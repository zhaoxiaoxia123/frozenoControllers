import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../core/global.service";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-dealer-finance',
    templateUrl: './dealer-finance.component.html'
})
export class DealerFinanceComponent implements OnInit {

    income : any = [];
    monthGlance : any = [];
    yearGlance : any = [];
    now_month: number;
    now_year: number;
    c_id:string;

    selectData:any = ['1月', '2月', '3月','4月', '5月', '6月', '7月','8月', '9月', '10月', '11月', '12月'];
    rollback_url : string = '';
    /**菜单id */
    menu_id:any;
    /** 权限 */
    permissions : Array<any> = [];
    menuInfos : any = [];
    constructor(
      private router:Router,
      private cookieStore:CookieStoreService,
      private globalService:GlobalService
    ) {
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

        this.getGlanceList('day');
        this.getGlanceList('month');

    }
    securityoption = {
        title: {
            text: '2020年6月收益指数趋势图  ',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} W'
            },
            axisPointer: {
                snap: true
            }
        },
        visualMap: {
            show: false,
            dimension: 0,
            pieces: [{
                lte: 6,
                color: 'green'
            }, {
                gt: 6,
                lte: 8,
                color: 'red'
            }, {
                gt: 8,
                lte: 14,
                color: 'green'
            }, {
                gt: 14,
                lte: 17,
                color: 'red'
            }, {
                gt: 17,
                color: 'green'
            }]
        },
        series: [
            {
                name: '用电量',
                type: 'line',
                smooth: true,
                data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
                markArea: {
                    data: [ [{
                        name: '早高峰',
                        xAxis: '07:30'
                    }, {
                        xAxis: '10:00'
                    }], [{
                        name: '晚高峰',
                        xAxis: '17:30'
                    }, {
                        xAxis: '21:15'
                    }] ]
                }
            }
        ]
    };



    /**
     * 获取用户日月年收益指数
     */
    getCustomerIncome() {
        let url = 'getCustomerIncome?sid='+this.cookieStore.getCookie('sid');
        this.globalService.httpRequest('get',url)
          .subscribe((data)=>{
              if(data) {
                  this.income = data['result']['data'];
                  if (data['status'] == 202) {
                      this.cookieStore.removeAll(this.rollback_url);
                      this.router.navigate(['/auth/login']);
                  }
              }
          });
    }

    /**
     * 获取用户月收益指数一览
     */
    getGlanceList(type='day',year=0,month=0) {
        let url = 'getGlanceList?type='+type+'&year='+year+'&month='+month+'&sid='+this.cookieStore.getCookie('sid');
        this.globalService.httpRequest('get',url)
          .subscribe((data)=>{
              if(data) {
                  if(type == 'day') {
                      this.monthGlance = data;
                      this.now_month = this.monthGlance['result']['now_month'];
                  }else if(type == 'month') {
                      this.yearGlance = data;
                      this.now_year = this.yearGlance['result']['now_year'];
                  }
                  if (data['status'] == 202) {
                      this.cookieStore.removeAll(this.rollback_url);
                      this.router.navigate(['/auth/login']);
                  }
              }
          });
    }




}