import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitiateGeneralRoutingModule } from './initiate-general-routing.module';
import { InitiateGeneralComponent } from './initiate-general.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {DpDatePickerModule} from "ng2-date-picker";
import {SelectUserModule} from "../../shared/common/select-user/select-user.module";
import {SelectFileModule} from "../../shared/common/select-file/select-file.module";
import {BigPicModule} from "../../shared/common/big-pic/big-pic.module";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    InitiateGeneralRoutingModule,
    DpDatePickerModule,
    SelectUserModule,
    BigPicModule,
    SelectFileModule
  ],
  declarations: [InitiateGeneralComponent],
  providers:[ CookieStoreService ]
})
export class InitiateGeneralModule { }
