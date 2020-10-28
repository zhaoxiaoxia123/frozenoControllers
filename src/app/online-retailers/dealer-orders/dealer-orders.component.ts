import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dealer-orders',
    templateUrl: './dealer-orders.component.html'
})
export class DealerOrdersComponent implements OnInit {

    //顶部按钮是否启用显示
    editStatusUserOrderId : any = 0;
    orderList : any = [];
    constructor() { }

    ngOnInit() {
    }

}