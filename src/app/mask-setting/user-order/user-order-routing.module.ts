import { Routes, RouterModule } from '@angular/router';
import {UserOrderComponent} from "./user-order.component";

export const UserOrderRoutes: Routes = [{
    path: '',
    component: UserOrderComponent
}];
export const UserOrderRoutingModule = RouterModule.forChild(UserOrderRoutes);
