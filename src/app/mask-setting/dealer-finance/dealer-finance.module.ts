import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DealerFinanceRoutingModule} from "./dealer-finance-routing.module";
import {DealerFinanceComponent} from "./dealer-finance.component";
import {AngularEchartsModule} from "ngx-echarts";
@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        AngularEchartsModule,
        DealerFinanceRoutingModule
    ],
    declarations: [DealerFinanceComponent]
})
export class DealerFinanceModule { }
