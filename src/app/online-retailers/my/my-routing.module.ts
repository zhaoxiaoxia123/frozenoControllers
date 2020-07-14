import { Routes, RouterModule } from '@angular/router';
import {MyComponent} from "./my.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: MyComponent
}];
export const MyRoutingModule = RouterModule.forChild(SalesRoutes);
