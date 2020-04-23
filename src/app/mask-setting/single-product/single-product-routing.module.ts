import { Routes, RouterModule } from '@angular/router';
import {SingleProductComponent} from "./single-product.component";

export const SingleProductRoutes: Routes = [{
    path: '',
    component: SingleProductComponent
}];
export const SingleProductRoutingModule = RouterModule.forChild(SingleProductRoutes);
