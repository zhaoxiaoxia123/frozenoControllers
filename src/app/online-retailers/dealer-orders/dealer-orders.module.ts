import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DealerOrdersComponent} from "./dealer-orders.component";
import {DealerOrdersRoutingModule} from "./dealer-orders-routing.module";

@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        DealerOrdersRoutingModule
    ],
    declarations: [DealerOrdersComponent]
})
export class DealerOrdersModule { }
