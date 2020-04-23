import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProductRoutingModule } from './single-product-routing.module';
import { SingleProductComponent } from './single-product.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    ReactiveFormsModule,
    SingleProductRoutingModule
  ],
  declarations: [SingleProductComponent]
})
export class SingleProductModule { }
