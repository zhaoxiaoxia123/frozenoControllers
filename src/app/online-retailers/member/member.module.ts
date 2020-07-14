import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MemberComponent} from "./member.component";
import {MemberRoutingModule} from "./member-routing.module";
@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        MemberRoutingModule
    ],
    declarations: [MemberComponent]
})
export class MemberModule { }
