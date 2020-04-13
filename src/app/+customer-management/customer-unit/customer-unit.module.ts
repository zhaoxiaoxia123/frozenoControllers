import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerUnitRoutingModule } from './customer-unit-routing.module';
import { CustomerUnitComponent } from './customer-unit.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {CookieService} from "angular2-cookie/core";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerUnitRoutingModule
  ],
  declarations: [CustomerUnitComponent],
    providers:[CookieStoreService ]  // CookieService,  xx
})
export class CustomerUnitModule { }
