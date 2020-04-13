import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingEquipmentRoutingModule } from './setting-equipment-routing.module';
import { SettingEquipmentComponent } from './setting-equipment.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    SettingEquipmentRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [SettingEquipmentComponent],
    providers:[ CookieStoreService ]
})
export class SettingEquipmentModule { }
