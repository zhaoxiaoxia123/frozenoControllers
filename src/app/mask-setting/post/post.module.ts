import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    ReactiveFormsModule,
    PostRoutingModule,
    FileUploadModule
  ],
  declarations: [PostComponent]
})
export class PostModule { }
