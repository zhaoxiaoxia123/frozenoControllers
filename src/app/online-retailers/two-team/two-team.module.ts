import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TwoTeamComponent} from "./two-team.component";
import {TwoTeamRoutingModule} from "./two-team-routing.module";

@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        TwoTeamRoutingModule
    ],
    declarations: [TwoTeamComponent]
})
export class TwoTeamModule { }
