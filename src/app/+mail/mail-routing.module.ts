import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'my-mail',
        loadChildren: () => import('./my-mail/my-mail.module')
          .then((m) => m.MyMailModule),
        data: {pageTitle: 'MyMail'}
    },
];

export const routing = RouterModule.forChild(routes);
