import { Routes, RouterModule } from '@angular/router';
import {TeamViewComponent} from "./team-view.component";


export const SalesRoutes: Routes = [{
    path: '',
    component: TeamViewComponent
}];
export const TeamViewRoutingModule = RouterModule.forChild(SalesRoutes);
