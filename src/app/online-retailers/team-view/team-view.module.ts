import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TeamViewComponent} from "./team-view.component";
import {TeamViewRoutingModule} from "./team-view-routing.module";

@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        TeamViewRoutingModule
    ],
    declarations: [TeamViewComponent]
})
export class TeamViewModule { }
