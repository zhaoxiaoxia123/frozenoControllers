import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AddCouponComponent} from "./add-coupon.component";
import {AddCouponRoutingModule} from "./add-coupon-routing.module";
@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        AddCouponRoutingModule
    ],
    declarations: [AddCouponComponent]
})
export class AddCouponModule { }
