import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dealer-money',
    styleUrls: ['./dealer-money.css'],
    templateUrl: './dealer-money.component.html'
})
export class DealerMoneyComponent implements OnInit {

    //顶部按钮是否启用显示
    editStatusUserOrderId : any = 0;
    orderList : any = [];
    constructor() { }

    ngOnInit() {
    }

}