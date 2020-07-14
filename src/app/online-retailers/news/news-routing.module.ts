import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from "./news.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: NewsComponent
}];
export const NewsRoutingModule = RouterModule.forChild(SalesRoutes);
