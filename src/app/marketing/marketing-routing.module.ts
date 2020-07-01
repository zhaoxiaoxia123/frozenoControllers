import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'coupon',
        loadChildren: 'app/marketing/coupon/coupon.module#CouponModule',
        data: {pageTitle: 'coupon'}
    },
    {
        path: 'add-coupon',
        loadChildren: 'app/marketing/add-coupon/add-coupon.module#AddCouponModule',
        data: {pageTitle: 'add-coupon'}
    }
];

export const routing = RouterModule.forChild(routes);
