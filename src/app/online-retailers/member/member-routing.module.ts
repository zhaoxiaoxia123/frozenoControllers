import { Routes, RouterModule } from '@angular/router';
import {MemberComponent} from "./member.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: MemberComponent
}];
export const MemberRoutingModule = RouterModule.forChild(SalesRoutes);
