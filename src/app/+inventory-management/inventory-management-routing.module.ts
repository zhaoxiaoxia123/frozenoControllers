import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'inventory-classification',
        // loadChildren: 'app/+inventory-management/inventory-classification/inventory-classification.module#InventoryClassificationModule',
        loadChildren: () => import('./inventory-classification/inventory-classification.module')
          .then((m) => m.InventoryClassificationModule),
        data: {pageTitle: 'InventoryClassification'}
    },
    {
        path: 'inventory-requisition',
        // loadChildren: 'app/+inventory-management/.module#InventoryRequisitionModule',
        loadChildren: () => import('./inventory-requisition/inventory-requisition.module')
          .then((m) => m.InventoryRequisitionModule),
        data: {pageTitle: 'InventoryRequisition'}
    },
    {
        path: 'add-requisition/:stock_allot_id',
        // loadChildren: 'app/+inventory-management/add-requisition/add-requisition.module#AddRequisitionModule',
        loadChildren: () => import('./add-requisition/add-requisition.module')
          .then((m) => m.AddRequisitionModule),
        data: {pageTitle: 'AddRequisition'}
    },
    {
        path: 'add-outbound/:otherorder_id',
        // loadChildren: 'app/+inventory-management/add-outbound/add-outbound.module#AddOutboundModule',
        loadChildren: () => import('./add-outbound/add-outbound.module')
          .then((m) => m.AddOutboundModule),
        data: {pageTitle: 'AddOutbound'}
    },
    {
        path: 'add-storage/:otherorder_id',
        // loadChildren: 'app/+inventory-management/add-storage/add-storage.module#AddStorageModule',
        loadChildren: () => import('./add-storage/add-storage.module')
          .then((m) => m.AddStorageModule),
        data: {pageTitle: 'AddStorage'}
    },
    {
        path: 'inventory-early',
        // loadChildren: 'app/+inventory-management/inventory-early/inventory-early.module#InventoryEarlyModule',
        loadChildren: () => import('./inventory-early/inventory-early.module')
          .then((m) => m.InventoryEarlyModule),
        data: {pageTitle: 'InventoryEarly'}
    },
    {
        path: 'outbound',
        // loadChildren: 'app/+inventory-management/outbound/outbound.module#OutboundModule',
        loadChildren: () => import('./outbound/outbound.module')
          .then((m) => m.OutboundModule),
        data: {pageTitle: 'Outbound'}
    },
    {
        path: 'storage',
        // loadChildren: 'app/+inventory-management/storage/storage.module#StorageModule',
        loadChildren: () => import('./storage/storage.module')
          .then((m) => m.StorageModule),
        data: {pageTitle: 'Storage'}
    },
    {
        path: 'inventory-number',
        // loadChildren: 'app/+inventory-management/inventory-number/inventory-number.module#InventoryNumberModule',
        loadChildren: () => import('./inventory-number/inventory-number.module')
          .then((m) => m.InventoryNumberModule),
        data: {pageTitle: 'InventoryNumber'}
    },
];

export const routing = RouterModule.forChild(routes);