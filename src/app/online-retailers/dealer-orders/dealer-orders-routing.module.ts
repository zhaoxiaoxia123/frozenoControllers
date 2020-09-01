import { Routes, RouterModule } from '@angular/router';
import {DealerOrdersComponent} from "./dealer-orders.component";


export const SalesRoutes: Routes = [{
    path: '',
    component: DealerOrdersComponent
}];
export const DealerOrdersRoutingModule = RouterModule.forChild(SalesRoutes);
