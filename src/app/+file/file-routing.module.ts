import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'my-file',
        loadChildren: () => import('./my-file/my-file.module')
          .then((m) => m.MyFileModule),
        data: {pageTitle: 'MyFile'}
    },
];

export const routing = RouterModule.forChild(routes);