import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationBlockRoutingModule } from './station-block-routing.module';
import {StationBlockComponent} from './station-block.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {NgxEchartsModule} from "ngx-echarts";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    NgxEchartsModule,
    StationBlockRoutingModule
  ],
  declarations: [StationBlockComponent]
})
export class StationBlockModule { }
