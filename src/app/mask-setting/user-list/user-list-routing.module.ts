import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from "./user-list.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: UserListComponent
}];
export const UserListRoutingModule = RouterModule.forChild(SalesRoutes);
