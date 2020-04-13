import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitListRoutingModule } from './unit-list-routing.module';
import { UnitListComponent } from './unit-list.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    FormsModule,
    ReactiveFormsModule,
    UnitListRoutingModule
  ],
  declarations: [UnitListComponent],
  providers:[ CookieStoreService ]
})
export class UnitListModule { }
