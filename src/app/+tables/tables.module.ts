import {NgModule} from '@angular/core';
import {I3otpModule} from '../shared/i3otp.module';
import {routing} from './tables.routing';
import { ListStaffComponent } from './list-staff/list-staff.component';
import {CookieStoreService} from '../shared/cookies/cookie-store.service';
import { ListInventoryComponent } from './list-inventory/list-inventory.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ListStaffComponent,
    ListInventoryComponent,
  ],
  imports: [
    I3otpModule,
    ReactiveFormsModule,
    routing
  ],
  providers:[ CookieStoreService ]
})
export class TablesModule {}
