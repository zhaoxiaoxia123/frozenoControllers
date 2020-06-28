import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    FileUploadModule
  ],
  declarations: [ProductComponent]
})
export class ProductModule { }
