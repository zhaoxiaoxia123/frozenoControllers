import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountCompanyRoutingModule } from './account-company-routing.module';
import { AccountCompanyComponent } from './account-company.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
      I3otpModule,
    FormsModule,
    ReactiveFormsModule,
    AccountCompanyRoutingModule
  ],
  declarations: [AccountCompanyComponent],
  providers:[ CookieStoreService ]
})
export class AccountCompanyModule { }
