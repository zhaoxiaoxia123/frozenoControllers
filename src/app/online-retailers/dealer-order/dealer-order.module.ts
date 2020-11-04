import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from "../../shared/i3otp.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DealerOrderComponent} from "./dealer-order.component";
import {DealerOrderRoutingModule} from "./dealer-order-routing.module";
import {EssenceNg2PrintModule} from "essence-ng2-print";
// import {ImgCropperSelectModule} from "../../shared/img-cropper-select/img-cropper-select.module";
// import {ImageCropperModule} from "ng2-img-cropper";
@NgModule({
    imports: [
        CommonModule,
        I3otpModule,
        ReactiveFormsModule,
        // ImageCropperModule,
        // ImgCropperSelectModule,
        EssenceNg2PrintModule,
        DealerOrderRoutingModule
    ],
    declarations: [DealerOrderComponent]
})
export class DealerOrderModule { }
