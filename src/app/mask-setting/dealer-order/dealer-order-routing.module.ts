import { Routes, RouterModule } from '@angular/router';
import {DealerOrderComponent} from "./dealer-order.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: DealerOrderComponent
}];
export const DealerOrderRoutingModule = RouterModule.forChild(SalesRoutes);
