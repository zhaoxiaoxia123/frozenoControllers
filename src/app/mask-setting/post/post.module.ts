import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FileUploadModule} from "ng2-file-upload";
import {ShareDragModule} from "../share.module";
// import {dragsortinstruct} from "../../core/dragsortbeauty";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    ReactiveFormsModule,
    PostRoutingModule,
    FileUploadModule,
    ShareDragModule
  ],
  declarations: [PostComponent]
})
export class PostModule { }
