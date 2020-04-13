import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ImageCropperModule} from "ng2-img-cropper";
import {ImgCropperSelectModule} from "../../shared/img-cropper-select/img-cropper-select.module";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    ReactiveFormsModule,
    ImageCropperModule,
    ImgCropperSelectModule,
    PostRoutingModule
  ],
  declarations: [PostComponent]
})
export class PostModule { }
