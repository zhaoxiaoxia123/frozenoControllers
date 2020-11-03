import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'medical-billing/:pr_id',
        // loadChildren: 'app/+medical/medical-billing/medical-billing.module#MedicalBillingModule',
        loadChildren: () => import('./medical-billing/medical-billing.module')
          .then((m) => m.MedicalBillingModule),
        data: {pageTitle: 'MedicalBilling'}
    },
    {
        path: 'medical-commodity',
        // loadChildren: 'app/+medical/medical-commodity/medical-commodity.module#MedicalCommodityModule',
        loadChildren: () => import('./medical-commodity/medical-commodity.module')
          .then((m) => m.MedicalCommodityModule),
        data: {pageTitle: 'MedicalCommodity'}
    },
    {
        path: 'medical-employees',
        // loadChildren: 'app/+medical/medical-employees/medical-employees.module#MedicalEmployeesModule',
        loadChildren: () => import('./medical-employees/medical-employees.module')
          .then((m) => m.MedicalEmployeesModule),
        data: {pageTitle: 'MedicalEmployees'}
    },
    {
        path: 'medical-inventory',
        // loadChildren: 'app/+medical/medical-inventory/medical-inventory.module#MedicalInventoryModule',
        loadChildren: () => import('./medical-inventory/medical-inventory.module')
          .then((m) => m.MedicalInventoryModule),
        data: {pageTitle: 'MedicalInventory'}
    },
    {
        path: 'medical-patient/:info',
        // loadChildren: 'app/+medical/medical-patient/medical-patient.module#MedicalPatientModule',
        loadChildren: () => import('./medical-patient/medical-patient.module')
          .then((m) => m.MedicalPatientModule),
        data: {pageTitle: 'MedicalPatient'}
    },
    {
        path: 'medical-sales',
        // loadChildren: 'app/+medical/medical-sales/medical-sales.module#MedicalSalesModule',
        loadChildren: () => import('./medical-sales/medical-sales.module')
          .then((m) => m.MedicalSalesModule),
        data: {pageTitle: 'MedicalSales'}
    },
];

export const routing = RouterModule.forChild(routes);