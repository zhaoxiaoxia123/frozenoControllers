import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalCommodityRoutingModule } from './medical-commodity-routing.module';
import { MedicalCommodityComponent } from './medical-commodity.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
// import {CookieService} from "angular2-cookie/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DpDatePickerModule} from "ng2-date-picker";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    MedicalCommodityRoutingModule
  ],
  declarations: [MedicalCommodityComponent],
  providers:[CookieStoreService ]  // CookieService,  xx
})
export class MedicalCommodityModule { }
