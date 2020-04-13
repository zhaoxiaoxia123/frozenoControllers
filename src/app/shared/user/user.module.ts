import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginInfoComponent} from "./login-info/login-info.component";
import {LogoutComponent} from "./logout/logout.component";
import {CookieStoreService} from "../cookies/cookie-store.service";

@NgModule({
  imports: [CommonModule],
  declarations: [LoginInfoComponent, LogoutComponent],
  exports: [LoginInfoComponent, LogoutComponent],
  providers: [ CookieStoreService ]
})
export class UserModule{}
