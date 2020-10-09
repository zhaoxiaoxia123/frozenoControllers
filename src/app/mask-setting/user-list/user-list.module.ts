import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {UserListRoutingModule} from "./user-list-routing.module";
import {UserListComponent} from "./user-list.component";
@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        UserListRoutingModule
    ],
    declarations: [UserListComponent]
})
export class UserListModule { }
