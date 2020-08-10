import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SalesOrderComponent} from "./sales-order.component";
import {SalesOrderRoutingModule} from "./sales-order-routing.module";
@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        SalesOrderRoutingModule
    ],
    declarations: [SalesOrderComponent]
})
export class SalesOrderModule { }
