import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingDepartmentnewRoutingModule } from './setting-departmentnew-routing.module';
import { SettingDepartmentnewComponent } from './setting-departmentnew.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    FormsModule,
    ReactiveFormsModule,
    SettingDepartmentnewRoutingModule
  ],
  declarations: [SettingDepartmentnewComponent],
  providers:[ CookieStoreService ]
})
export class SettingDepartmentnewModule { }
