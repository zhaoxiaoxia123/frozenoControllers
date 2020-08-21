import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SalesOrderComponent} from "./sales-order.component";
import {SalesOrderRoutingModule} from "./sales-order-routing.module";
import {FileUploadModule} from "ng2-file-upload";
@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        SalesOrderRoutingModule,
        FileUploadModule
    ],
    declarations: [SalesOrderComponent]
})
export class SalesOrderModule { }
