import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitiateLeaveRoutingModule } from './initiate-leave-routing.module';
import { InitiateLeaveComponent } from './initiate-leave.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DpDatePickerModule} from "ng2-date-picker";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {SelectFileModule} from "../../shared/common/select-file/select-file.module";
import {SelectUserModule} from "../../shared/common/select-user/select-user.module";
import {BigPicModule} from "../../shared/common/big-pic/big-pic.module";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    InitiateLeaveRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    SelectUserModule,
    BigPicModule,
    SelectFileModule
],
declarations: [InitiateLeaveComponent],
    providers:[ CookieStoreService ]
})
export class InitiateLeaveModule { }
