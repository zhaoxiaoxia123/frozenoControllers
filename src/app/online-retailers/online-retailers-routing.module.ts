import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dealer-finance',
        loadChildren: 'app/online-retailers/dealer-finance/dealer-finance.module#DealerFinanceModule',
        data: {pageTitle: 'dealer-finance'}
    },
    {
        path: 'dealer-order',
        loadChildren: 'app/online-retailers/dealer-order/dealer-order.module#DealerOrderModule',
        data: {pageTitle: 'dealer-order'}
    }
];

export const routing = RouterModule.forChild(routes);
