import { Routes, RouterModule } from '@angular/router';
import {EditSalesComponent} from "./edit-sales.component";

export const editSalesRoutes: Routes = [{
    path: '',
    component: EditSalesComponent
}];
export const EditSalesRoutingModule = RouterModule.forChild(editSalesRoutes);
