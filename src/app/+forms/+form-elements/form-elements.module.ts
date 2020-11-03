import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formElementsRouting } from './form-elements.routing';
import {I3otpModule} from "../../shared/i3otp.module";
import {FormElementsComponent, KeysPipe} from './form-elements.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    formElementsRouting,
    NgxEchartsModule,
    I3otpModule
  ],
  declarations: [
    FormElementsComponent,
    KeysPipe
  ],
  exports : [
    KeysPipe
  ]
})
export class FormElementsModule { }
