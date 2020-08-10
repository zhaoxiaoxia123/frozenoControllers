import { Routes, RouterModule } from '@angular/router';
import {SalesOrderComponent} from "./sales-order.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: SalesOrderComponent
}];
export const SalesOrderRoutingModule = RouterModule.forChild(SalesRoutes);