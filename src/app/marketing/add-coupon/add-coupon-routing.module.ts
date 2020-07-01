import { Routes, RouterModule } from '@angular/router';
import {AddCouponComponent} from "../add-coupon/add-coupon.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: AddCouponComponent
}];
export const AddCouponRoutingModule = RouterModule.forChild(SalesRoutes);
