import { Routes, RouterModule } from '@angular/router';
import {AddProductComponent} from "./add-product.component";

export const addProductRoutes: Routes = [{
    path: '',
    component: AddProductComponent
}];
export const AddProductRoutingModule = RouterModule.forChild(addProductRoutes);
