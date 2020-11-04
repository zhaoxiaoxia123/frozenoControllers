import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeesComponent } from './add-employees.component';
import {addEmployeesRouting} from './add-employees-routing.module';
import { RegistrationFormComponent} from './registration-form/registration-form.component';
import {I3otpModule} from '../../shared/i3otp.module';
import {CookieStoreService} from '../../shared/cookies/cookie-store.service';
import {ReactiveFormsModule} from '@angular/forms';
// import { ImageCropperModule} from "ng2-img-cropper";
// import {ImgCropperSelectModule} from "../../shared/img-cropper-select/img-cropper-select.module";
import {DpDatePickerModule} from "ng2-date-picker";
import {FileUploadModule} from "ng2-file-upload";
@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    ReactiveFormsModule,
    addEmployeesRouting,
    // ImageCropperModule,
    // ImgCropperSelectModule,
    FileUploadModule,
    DpDatePickerModule
  ],
  declarations: [
    AddEmployeesComponent,
    RegistrationFormComponent
  ],
  providers:[ CookieStoreService ]
})
export class AddEmployeesModule {}
