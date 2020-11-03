import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'add-sales/:pr_id',
        // loadChildren: 'app/+sales-management/add-sales/add-sales.module#AddSalesModule',
        loadChildren: () => import('./add-sales/add-sales.module')
          .then((m) => m.AddSalesModule),
        data: {pageTitle: 'AddSales'}
    },
    {
        path: 'sales-list',
        // loadChildren: 'app/+sales-management/sales-list/sales-list.module#SalesListModule',
        loadChildren: () => import('./sales-list/sales-list.module')
          .then((m) => m.SalesListModule),
        data: {pageTitle: 'SalesList'}
    },
    {
        path: 'sales-type',
        // loadChildren: 'app/+sales-management/sales-type/sales-type.module#SalesTypeModule',
        loadChildren: () => import('./sales-type/sales-type.module')
          .then((m) => m.SalesTypeModule),
        data: {pageTitle: 'SalesType'}
    },
];

export const routing = RouterModule.forChild(routes);
