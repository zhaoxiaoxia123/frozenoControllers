import { Routes, RouterModule } from '@angular/router';
import {CustomerDetailsComponent} from "./customer-details.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: CustomerDetailsComponent
}];
export const CustomerDetailsRoutingModule = RouterModule.forChild(SalesRoutes);
