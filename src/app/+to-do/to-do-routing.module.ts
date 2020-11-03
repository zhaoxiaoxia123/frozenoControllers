import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'todo-message',
        // loadChildren: 'app/+to-do/todo-message/todo-message.module#TodoMessageModule',
        loadChildren: () => import('./todo-message/todo-message.module')
          .then((m) => m.TodoMessageModule),
        data: {pageTitle: 'TodoMessage'}
    },
    {
        path: 'todo-workbench',
        // loadChildren: 'app/+to-do/todo-workbench/todo-workbench.module#TodoWorkbenchModule',
        loadChildren: () => import('./todo-workbench/todo-workbench.module')
          .then((m) => m.TodoWorkbenchModule),
        data: {pageTitle: 'TodoWorkbench'}
    },
];

export const routing = RouterModule.forChild(routes);
