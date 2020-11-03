import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CustomerDetailsComponent} from "./customer-details.component";
import {CustomerDetailsRoutingModule} from "./customer-details-routing.module";

@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        CustomerDetailsRoutingModule
    ],
    declarations: [CustomerDetailsComponent]
})
export class CustomerDetailsModule { }
