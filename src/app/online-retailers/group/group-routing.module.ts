import { Routes, RouterModule } from '@angular/router';
import {GroupComponent} from "./group.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: GroupComponent
}];
export const GroupRoutingModule = RouterModule.forChild(SalesRoutes);
