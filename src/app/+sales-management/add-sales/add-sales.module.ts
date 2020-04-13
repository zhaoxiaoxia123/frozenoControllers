import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSalesRoutingModule } from './add-sales-routing.module';
import { AddSalesComponent } from './add-sales.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {CookieService} from 'angular2-cookie/core';
import {CookieStoreService} from '../../shared/cookies/cookie-store.service';
import {DpDatePickerModule} from "ng2-date-picker";
import {SelectUserModule} from "../../shared/common/select-user/select-user.module";
import {VerifyFrameModule} from "../../shared/common/verify-frame/verify-frame.module";
import {SelectStockModule} from "../../shared/common/select-stock/select-stock.module";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    SelectUserModule,
    VerifyFrameModule,
    SelectStockModule,
    AddSalesRoutingModule
  ],
  declarations: [AddSalesComponent],
  providers:[CookieStoreService ]  // CookieService,  xx
})
export class AddSalesModule { }
