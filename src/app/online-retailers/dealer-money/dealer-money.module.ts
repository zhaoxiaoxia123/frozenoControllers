import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DealerMoneyComponent} from "./dealer-money.component";
import {DealerMoneyRoutingModule} from "./dealer-money-routing.module";

@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        DealerMoneyRoutingModule
    ],
    declarations: [DealerMoneyComponent]
})
export class DealerMoneyModule { }
