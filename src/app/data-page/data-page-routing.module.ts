import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'read-write-data',
        loadChildren: () => import('./read-write-data/read-write-data.module')
          .then((m) => m.ReadWriteDataModule),
        data: {pageTitle: 'ReadWriteData'}
    }
];

export const routing = RouterModule.forChild(routes);