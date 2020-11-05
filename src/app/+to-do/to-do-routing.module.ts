import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'todo-message',
        loadChildren: () => import('./todo-message/todo-message.module')
          .then((m) => m.TodoMessageModule),
        data: {pageTitle: 'TodoMessage'}
    },
    {
        path: 'todo-workbench',
        loadChildren: () => import('./todo-workbench/todo-workbench.module')
          .then((m) => m.TodoWorkbenchModule),
        data: {pageTitle: 'TodoWorkbench'}
    },
];

export const routing = RouterModule.forChild(routes);
