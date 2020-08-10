import { Routes, RouterModule } from '@angular/router';
import {SalesDepositComponent} from "./sales-deposit.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: SalesDepositComponent
}];
export const SalesDepositRoutingModule = RouterModule.forChild(SalesRoutes);