import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MyComponent} from "./my.component";
import {MyRoutingModule} from "./my-routing.module";
@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        MyRoutingModule
    ],
    declarations: [MyComponent]
})
export class MyModule { }
