import { Routes, RouterModule } from '@angular/router';
import {DealerMoneyComponent} from "./dealer-money.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: DealerMoneyComponent
}];
export const DealerMoneyRoutingModule = RouterModule.forChild(SalesRoutes);
