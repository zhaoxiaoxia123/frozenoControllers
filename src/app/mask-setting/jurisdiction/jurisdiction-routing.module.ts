import { Routes, RouterModule } from '@angular/router';
import {JurisdictionComponent} from "./jurisdiction.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: JurisdictionComponent
}];
export const JurisdictionRoutingModule = RouterModule.forChild(SalesRoutes);
