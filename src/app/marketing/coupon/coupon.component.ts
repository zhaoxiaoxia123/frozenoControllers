import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-coupon',
    templateUrl: './coupon.component.html'
})
export class CouponComponent implements OnInit {
    isStatus: number = 0;
    assetsInfo:any = [];
    approve_user:any= [];
    follower_user:any= [];
    rollback_url : string = '';
    /**菜单id */
    menu_id:any;
    /** 权限 */
    permissions : Array<any> = [];
    menuInfos : any = [];
    constructor() { }

    ngOnInit() {
    }

}