import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SalesDepositComponent} from "./sales-deposit.component";
import {SalesDepositRoutingModule} from "./sales-deposit-routing.module";
import {FileUploadModule} from "ng2-file-upload";
@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        SalesDepositRoutingModule,
        FileUploadModule
    ],
    declarations: [SalesDepositComponent]
})
export class SalesDepositModule { }
