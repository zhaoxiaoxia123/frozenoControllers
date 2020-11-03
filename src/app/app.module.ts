import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing'
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
// Core providers
import {CoreModule} from "./core/core.module";
import {I3otpLayoutModule} from "./shared/layout/layout.module";
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {GlobalService} from './core/global.service';
import { NgxEchartsModule } from 'ngx-echarts';
import {TododetailService} from "./shared/tododetail.service";
import {CookieModule} from "ngx-cookie";
import {CookieStoreService} from "./shared/cookies/cookie-store.service";
import {ImageCropperModule} from "ng2-img-cropper";
// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    CoreModule,
    I3otpLayoutModule,
    NgxEchartsModule.forRoot({echarts:()=>import('echarts')}),
    routing,
    CookieModule.forRoot()
  ],
  exports: [
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    // ENV_PROVIDERS,
    APP_PROVIDERS,
    {provide:LocationStrategy,useClass:HashLocationStrategy},
    GlobalService,
    TododetailService,
    CookieStoreService
  ]
})
export class AppModule {
    private static ChartsModule: any;
  constructor(public appRef: ApplicationRef, public appState: AppState) {}
}

