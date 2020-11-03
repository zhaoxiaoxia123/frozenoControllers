import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I3otpModule} from '../shared/i3otp.module';
import {routing} from './equipment.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {CookieStoreService} from '../shared/cookies/cookie-store.service';
import { AddPhonicsComponent } from './add-phonics/add-phonics.component';
import { HelmetChartComponent } from './helmet-chart/helmet-chart.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { StationChartComponent } from './station-chart/station-chart.component';
import { ChartSettingComponent } from './chart-setting/chart-setting.component';
import {DataMapComponent, KeysPipe} from './data-map/data-map.component';
import {UnsavedGuard} from "../shared/cookies/unsaved.guard";
import {ChartGuard} from "../shared/cookies/chart.guard";
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';
import {HelmetChartGuard} from "../shared/cookies/helmetChart.guard";
import { PhonicsListComponent } from './phonics-list/phonics-list.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    I3otpModule,
    ReactiveFormsModule,
    NgxEchartsModule,
  ],
  declarations: [
    AddPhonicsComponent,
    HelmetChartComponent,
    StationChartComponent,
    ChartSettingComponent,
    DataMapComponent,
    KeysPipe,
    EquipmentListComponent,
    AddEquipmentComponent,
    PhonicsListComponent
  ],
    exports : [
      KeysPipe
    ],
  providers:[CookieStoreService,UnsavedGuard,ChartGuard,HelmetChartGuard] // CookieService,  xx
})
export class EquipmentModule { }
