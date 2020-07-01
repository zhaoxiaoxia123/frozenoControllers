import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CouponRoutingModule} from "./coupon-routing.module";
import {CouponComponent} from "./coupon.component";
@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        CouponRoutingModule
    ],
    declarations: [CouponComponent]
})
export class CouponModule { }
