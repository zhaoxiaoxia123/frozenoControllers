import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'post',
        loadChildren: 'app/mask-setting/post/post.module#PostModule',
        data: {pageTitle: 'Post'}
    },
    {
        path: 'user-order',
        loadChildren: 'app/mask-setting/user-order/user-order.module#UserOrderModule',
        data: {pageTitle: 'user-order'}
    },
    {
        path: 'sales',
        loadChildren: 'app/mask-setting/sales/sales.module#SalesModule',
        data: {pageTitle: 'sales'}
    },
    {
        path: 'edit-sales/:pr_id',
        loadChildren: 'app/mask-setting/edit-sales/edit-sales.module#EditSalesModule',
        data: {pageTitle: 'edit-sales'}
    },
    {
        path: 'add-product/:p_id',
        loadChildren: 'app/mask-setting/add-product/add-product.module#AddProductModule',
        data: {pageTitle: 'add-product'}
    },
    {
        path: 'single-product',
        loadChildren: 'app/mask-setting/single-product/single-product.module#SingleProductModule',
        data: {pageTitle: 'single-product'}
    }
];

export const routing = RouterModule.forChild(routes);
