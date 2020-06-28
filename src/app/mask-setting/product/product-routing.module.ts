import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from "./product.component";

export const ProductRoutes: Routes = [{
    path: '',
    component: ProductComponent
}];
export const ProductRoutingModule = RouterModule.forChild(ProductRoutes);
