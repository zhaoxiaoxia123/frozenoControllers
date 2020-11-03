import {ModuleWithProviders, NgModule} from "@angular/core";
import {BodyService} from "./body.service";
import {NotificationService} from "./notification.service";

@NgModule({
  declarations: [],
  exports: [],
  providers: [BodyService, NotificationService]
})
export class UtilsModule{
  static forRoot(): ModuleWithProviders<UtilsModule> {
    return {
        ngModule: UtilsModule,
        providers: [BodyService, NotificationService]
    };
}
}
