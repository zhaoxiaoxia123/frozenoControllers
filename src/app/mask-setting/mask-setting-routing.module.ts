import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'post',
        // loadChildren: 'app/mask-setting/post/post.module#PostModule',
        loadChildren: () => import('./post/post.module')
          .then((m) => m.PostModule),
        data: {pageTitle: 'Post'}
    },
    {
        path: 'user-order',
        // loadChildren: 'app/mask-setting/user-order/user-order.module#UserOrderModule',
        loadChildren: () => import('./user-order/user-order.module')
          .then((m) => m.UserOrderModule),
        data: {pageTitle: 'user-order'}
    },
    {
        path: 'sales',
        // loadChildren: 'app/mask-setting/sales/sales.module#SalesModule',
        loadChildren: () => import('./sales/sales.module')
          .then((m) => m.SalesModule),
        data: {pageTitle: 'sales'}
    },
    {
        path: 'edit-sales/:pr_id',
        // loadChildren: 'app/mask-setting/edit-sales/edit-sales.module#EditSalesModule',
        loadChildren: () => import('./edit-sales/edit-sales.module')
          .then((m) => m.EditSalesModule),
        data: {pageTitle: 'edit-sales'}
    },
    {
        path: 'add-product/:p_id',
        // loadChildren: 'app/mask-setting/add-product/add-product.module#AddProductModule',
        loadChildren: () => import('./add-product/add-product.module')
          .then((m) => m.AddProductModule),
        data: {pageTitle: 'add-product'}
    },
    {
        path: 'single-product',
        // loadChildren: 'app/mask-setting/single-product/single-product.module#SingleProductModule',
        loadChildren: () => import('./single-product/single-product.module')
          .then((m) => m.SingleProductModule),
        data: {pageTitle: 'single-product'}
    },
    {
        path: 'product',
        // loadChildren: 'app/mask-setting/product/product.module#ProductModule',
        loadChildren: () => import('./product/product.module')
          .then((m) => m.ProductModule),
        data: {pageTitle: 'product'}
    },
    {
        path: 'jurisdiction',
        // loadChildren: 'app/mask-setting/jurisdiction/jurisdiction.module#JurisdictionModule',
        loadChildren: () => import('./jurisdiction/jurisdiction.module')
          .then((m) => m.JurisdictionModule),
        data: {pageTitle: 'jurisdiction'}
    },
    {
        path: 'user-list',
        // loadChildren: 'app/mask-setting/user-list/user-list.module#UserListModule',
        loadChildren: () => import('./user-list/user-list.module')
          .then((m) => m.UserListModule),
        data: {pageTitle: 'user-list'}
    },
];

export const routing = RouterModule.forChild(routes);
