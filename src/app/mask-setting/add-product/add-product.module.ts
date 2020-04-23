import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductRoutingModule } from './add-product-routing.module';
import { AddProductComponent } from './add-product.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    FormsModule,
    ReactiveFormsModule,
    AddProductRoutingModule
  ],
  declarations: [
      AddProductComponent,
  ],
  providers:[CookieStoreService ]  // CookieService,  xx
})
export class AddProductModule { }
