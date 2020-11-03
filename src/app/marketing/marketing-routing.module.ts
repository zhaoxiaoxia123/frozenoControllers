import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'coupon',
        // loadChildren: 'app/marketing/coupon/coupon.module#CouponModule',
        loadChildren: () => import('./coupon/coupon.module')
          .then((m) => m.CouponModule),
        data: {pageTitle: 'coupon'}
    },
    {
        path: 'add-coupon',
        // loadChildren: 'app/marketing/add-coupon/add-coupon.module#AddCouponModule',
        loadChildren: () => import('./add-coupon/add-coupon.module')
          .then((m) => m.AddCouponModule),
        data: {pageTitle: 'add-coupon'}
    }
];

export const routing = RouterModule.forChild(routes);
