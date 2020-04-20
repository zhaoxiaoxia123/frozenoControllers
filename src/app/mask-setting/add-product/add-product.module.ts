import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductRoutingModule } from './add-product-routing.module';
import { AddProductComponent } from './add-product.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {CookieService} from "angular2-cookie/core";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {BigPicModule} from "../../shared/common/big-pic/big-pic.module";
import {SelectFileModule} from "../../shared/common/select-file/select-file.module";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    FormsModule,
    ReactiveFormsModule,
    AddProductRoutingModule,
    BigPicModule,
    SelectFileModule
  ],
  declarations: [
      AddProductComponent,
  ],
  providers:[CookieStoreService ]  // CookieService,  xx
})
export class AddProductModule { }
