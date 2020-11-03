import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {GroupComponent} from "./group.component";
import {GroupRoutingModule} from "./group-routing.module";

@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        GroupRoutingModule
    ],
    declarations: [GroupComponent]
})
export class GroupModule { }
