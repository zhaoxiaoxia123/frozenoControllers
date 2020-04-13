import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    ReactiveFormsModule,
    SalesRoutingModule
  ],
  declarations: [SalesComponent]
})
export class SalesModule { }
