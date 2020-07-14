import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: HomeComponent
}];
export const HomeRoutingModule = RouterModule.forChild(SalesRoutes);
