import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'unit-classify',
        loadChildren: () => import('./unit-classify/unit-classify.module')
          .then((m) => m.UnitClassifyModule),
        data: {pageTitle: 'UnitClassify'}
    },
    {
        path: 'unit-list',
        // loadChildren: 'app/+customer-management/unit-list/unit-list.module#UnitListModule',
        loadChildren: () => import('./unit-list/unit-list.module')
          .then((m) => m.UnitListModule),
        data: {pageTitle: 'UnitList'}
    },
    {
        path: 'customer-unit',
        // loadChildren: 'app/+customer-management/customer-unit/customer-unit.module#CustomerUnitModule',
        loadChildren: () => import('./customer-unit/customer-unit.module')
          .then((m) => m.CustomerUnitModule),
        data: {pageTitle: 'CustomerUnit'}
    },
];

export const routing = RouterModule.forChild(routes);
