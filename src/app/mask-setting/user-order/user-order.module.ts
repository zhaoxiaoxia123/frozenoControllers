import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOrderRoutingModule } from './user-order-routing.module';
import { UserOrderComponent } from './user-order.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ImageCropperModule} from "ng2-img-cropper";
import {ImgCropperSelectModule} from "../../shared/img-cropper-select/img-cropper-select.module";
import {EssenceNg2PrintModule} from "essence-ng2-print";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    ReactiveFormsModule,
    ImageCropperModule,
    ImgCropperSelectModule,
    EssenceNg2PrintModule,
    UserOrderRoutingModule
  ],
  declarations: [UserOrderComponent]
})
export class UserOrderModule { }
