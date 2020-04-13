import { Routes, RouterModule } from '@angular/router';
import {SalesComponent} from "./sales.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: SalesComponent
}];
export const SalesRoutingModule = RouterModule.forChild(SalesRoutes);
