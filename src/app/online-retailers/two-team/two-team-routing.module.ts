import { Routes, RouterModule } from '@angular/router';
import {TwoTeamComponent} from "./two-team.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: TwoTeamComponent
}];
export const TwoTeamRoutingModule = RouterModule.forChild(SalesRoutes);
