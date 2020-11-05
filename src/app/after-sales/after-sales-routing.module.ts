import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'sales-deposit',
        loadChildren: () => import('./sales-deposit/sales-deposit.module')
          .then((m) => m.SalesDepositModule),
        data: {pageTitle: 'sales-deposit'}
    },
    {
        path: 'sales-order',
        loadChildren: () => import('./sales-order/sales-order.module')
          .then((m) => m.SalesOrderModule),
        data: {pageTitle: 'sales-order'}
    }
];

export const routing = RouterModule.forChild(routes);
