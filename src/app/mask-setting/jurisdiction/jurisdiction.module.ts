import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {JurisdictionRoutingModule} from "./jurisdiction-routing.module";
import {JurisdictionComponent} from "./jurisdiction.component";
@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        JurisdictionRoutingModule
    ],
    declarations: [JurisdictionComponent]
})
export class JurisdictionModule { }
