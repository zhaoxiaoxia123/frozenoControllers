import { Routes, RouterModule } from '@angular/router';
export const routes: Routes = [
    {
        path: 'add-receipt/:pr_id',
        // loadChildren: 'app/+procurement-management/add-receipt/add-receipt.module#AddReceiptModule',
        loadChildren: () => import('./add-receipt/add-receipt.module')
          .then((m) => m.AddReceiptModule),
        data: {pageTitle: 'AddReceipt'}
    },
    {
        path: 'procurement-receipt',
        // loadChildren: 'app/+procurement-management/procurement-receipt/procurement-receipt.module#ProcurementReceiptModule',
        loadChildren: () => import('./procurement-receipt/procurement-receipt.module')
          .then((m) => m.ProcurementReceiptModule),
        data: {pageTitle: 'ProcurementReceipt'}
    },
    {
        path: 'procurement-type',
        // loadChildren: 'app/+procurement-management/procurement-type/procurement-type.module#ProcurementTypeModule',
        loadChildren: () => import('./procurement-type/procurement-type.module')
          .then((m) => m.ProcurementTypeModule),
        data: {pageTitle: 'ProcurementType'}
    }
];

export const routing = RouterModule.forChild(routes);
