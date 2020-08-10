import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'sales-deposit',
        loadChildren: 'app/after-sales/sales-deposit/sales-deposit.module#SalesDepositModule',
        data: {pageTitle: 'sales-deposit'}
    },
    {
        path: 'sales-order',
        loadChildren: 'app/after-sales/sales-order/sales-order.module#SalesOrderModule',
        data: {pageTitle: 'sales-order'}
    }
];

export const routing = RouterModule.forChild(routes);
