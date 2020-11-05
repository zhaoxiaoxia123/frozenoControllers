import { Routes, RouterModule } from '@angular/router';
export const routes: Routes = [
    {
        path: 'add-receipt/:pr_id',
        loadChildren: () => import('./add-receipt/add-receipt.module')
          .then((m) => m.AddReceiptModule),
        data: {pageTitle: 'AddReceipt'}
    },
    {
        path: 'procurement-receipt',
        loadChildren: () => import('./procurement-receipt/procurement-receipt.module')
          .then((m) => m.ProcurementReceiptModule),
        data: {pageTitle: 'ProcurementReceipt'}
    },
    {
        path: 'procurement-type',
        loadChildren: () => import('./procurement-type/procurement-type.module')
          .then((m) => m.ProcurementTypeModule),
        data: {pageTitle: 'ProcurementType'}
    }
];

export const routing = RouterModule.forChild(routes);
