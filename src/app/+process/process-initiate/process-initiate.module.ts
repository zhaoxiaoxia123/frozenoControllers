import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessInitiateRoutingModule } from './process-initiate-routing.module';
import { ProcessInitiateComponent } from './process-initiate.component';
import {I3otpModule} from "../../shared/i3otp.module";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    ProcessInitiateRoutingModule
  ],
  declarations: [ProcessInitiateComponent]
})
export class ProcessInitiateModule { }
