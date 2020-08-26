import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TeamComponent} from "./team.component";
import {TeamRoutingModule} from "./team-routing.module";
@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        TeamRoutingModule
    ],
    declarations: [TeamComponent]
})
export class TeamModule { }
