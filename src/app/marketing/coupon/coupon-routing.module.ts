import { Routes, RouterModule } from '@angular/router';
import {CouponComponent} from "./coupon.component";

export const SalesRoutes: Routes = [{
    path: '',
    component: CouponComponent
}];
export const CouponRoutingModule = RouterModule.forChild(SalesRoutes);