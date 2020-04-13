
import { Routes, RouterModule } from '@angular/router';
import {AddPhonicsComponent} from './add-phonics/add-phonics.component';
import {HelmetChartComponent} from './helmet-chart/helmet-chart.component';
import {StationChartComponent} from './station-chart/station-chart.component';
import {ChartSettingComponent} from './chart-setting/chart-setting.component';
import {DataMapComponent} from './data-map/data-map.component';
import {UnsavedGuard} from "../shared/cookies/unsaved.guard";
import {ChartGuard} from "../shared/cookies/chart.guard";
import {EquipmentListComponent} from "./equipment-list/equipment-list.component";
import {AddEquipmentComponent} from "./add-equipment/add-equipment.component";
import {HelmetChartGuard} from "../shared/cookies/helmetChart.guard";
import {PhonicsListComponent} from "./phonics-list/phonics-list.component";

export const routes:Routes = [
    {
        path: 'helmet-chart',
        component: HelmetChartComponent,
        canDeactivate:[HelmetChartGuard]  //路由守卫
    },
    {
        path: 'station-chart',
        component: StationChartComponent,
        canDeactivate:[ChartGuard]  //路由守卫
    },
    {
        path: 'chart-setting',
        component: ChartSettingComponent
    },
    {
        path: 'data-map',
        component: DataMapComponent,
        canDeactivate:[UnsavedGuard]  //路由守卫
    },
    {
        path: 'phonics/:b_id',
        component: AddPhonicsComponent
    },
    {
        path: 'equipment-list',
        component: EquipmentListComponent
    },
    {
        path: 'add-equipment/:i_id',
        component: AddEquipmentComponent
    },
    {
        path: 'phonics-list',
        component: PhonicsListComponent
    },
];

export const routing = RouterModule.forChild(routes)