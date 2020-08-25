import {NgModule} from "@angular/core";

import {routing} from "./app-views.routing";
import {I3otpModule} from "../shared/i3otp.module";

@NgModule({
    declarations: [],
    imports: [
        I3otpModule,
        routing,

    ],
    entryComponents: []
})
export class AppViewsModule {
}
