import { Routes, RouterModule } from '@angular/router';
import {DealerFinanceComponent} from "./dealer-finance.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: DealerFinanceComponent
}];
export const DealerFinanceRoutingModule = RouterModule.forChild(SalesRoutes);
