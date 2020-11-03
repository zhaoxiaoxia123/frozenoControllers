import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {
  ModalModule
} from 'ngx-bootstrap/modal'

import {
  ButtonsModule
} from 'ngx-bootstrap/buttons'
import {
  TooltipModule
} from 'ngx-bootstrap/tooltip'
import {
  BsDropdownModule
} from 'ngx-bootstrap/dropdown'
import {
  ProgressbarModule
} from 'ngx-bootstrap/progressbar'
import {
     AlertModule
} from 'ngx-bootstrap/alert'
import {
  TabsModule
} from 'ngx-bootstrap/tabs'
// import {PopoverModule} from "ngx-popover";
import {I3otpLayoutModule} from './layout'
import {I18nModule} from "./i18n/i18n.module";
import {VoiceControlModule} from "./voice-control/voice-control.module";
import {I3otpWidgetsModule} from "./widgets/i3otp-widgets.module";
import {UtilsModule} from "./utils/utils.module";
import {InlineGraphsModule} from "./graphs/inline/inline-graphs.module";
import {I3otpFormsLiteModule} from "./forms/i3otp-forms-lite.module";


@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule,
  ],
  declarations: [
  ],
  exports: [
    CommonModule, FormsModule, RouterModule,
    ModalModule,
    ButtonsModule,
    AlertModule,
    TabsModule,
    TooltipModule,
    BsDropdownModule,
    ProgressbarModule,
    // PopoverModule,
    I3otpLayoutModule,
    I18nModule,
    UtilsModule,
    I3otpFormsLiteModule,
    InlineGraphsModule,
    I3otpWidgetsModule,
    VoiceControlModule,
  ]
})
export class I3otpModule {}
