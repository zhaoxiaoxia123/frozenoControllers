import { Routes, RouterModule } from '@angular/router';
import {TeamComponent} from "./team.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: TeamComponent
}];
export const TeamRoutingModule = RouterModule.forChild(SalesRoutes);
