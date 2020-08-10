import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SalesDepositComponent} from "./sales-deposit.component";
import {SalesDepositRoutingModule} from "./sales-deposit-routing.module";
@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        SalesDepositRoutingModule
    ],
    declarations: [SalesDepositComponent]
})
export class SalesDepositModule { }
