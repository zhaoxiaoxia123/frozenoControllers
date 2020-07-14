import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        HomeRoutingModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
