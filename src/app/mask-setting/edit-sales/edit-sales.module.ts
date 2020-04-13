import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditSalesRoutingModule } from './edit-sales-routing.module';
import { EditSalesComponent } from './edit-sales.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieStoreService} from '../../shared/cookies/cookie-store.service';
import {DpDatePickerModule} from "ng2-date-picker";
import {SelectUserModule} from "../../shared/common/select-user/select-user.module";
import {VerifyFrameModule} from "../../shared/common/verify-frame/verify-frame.module";
@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    SelectUserModule,
    VerifyFrameModule,
    EditSalesRoutingModule
  ],
  declarations: [EditSalesComponent],
  providers:[CookieStoreService ]
})
export class EditSalesModule { }
