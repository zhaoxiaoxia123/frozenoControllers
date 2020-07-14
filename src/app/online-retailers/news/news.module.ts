import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NewsComponent} from "./news.component";
import {NewsRoutingModule} from "./news-routing.module";
@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        NewsRoutingModule
    ],
    declarations: [NewsComponent]
})
export class NewsModule { }
