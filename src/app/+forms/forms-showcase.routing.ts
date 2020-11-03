import {Routes, RouterModule} from '@angular/router';

export const routes: Routes = [
  {
    path: 'elements',
    // loadChildren: 'app/+forms/+form-elements/form-elements.module#FormElementsModule',
    loadChildren: () => import('./+form-elements/form-elements.module')
      .then((m) => m.FormElementsModule),
    data: {pageTitle: 'Elements'}
  },
  {
    path: 'validation',
    // loadChildren: 'app/+forms/+form-validation/form-validation.module#FormValidationModule',
    loadChildren: () => import('./+form-validation/form-validation.module')
      .then((m) => m.FormValidationModule),
    data: {pageTitle: 'Validation'}
  },
    {
      path: 'employees/:u_id',
        // loadChildren: 'app/+forms/+add-employees/add-employees.module#AddEmployeesModule',
      loadChildren: () => import('./+add-employees/add-employees.module')
        .then((m) => m.AddEmployeesModule),
      data: {pageTitle: 'Employees'}
    },
    {
      path: 'inventory1/:storehouse_id',
        // loadChildren: 'app/+forms/add-inventory1/add-inventory1.module#AddInventory1Module',
      loadChildren: () => import('./add-inventory1/add-inventory1.module')
        .then((m) => m.AddInventory1Module),
      data: {pageTitle: 'Inventory1'}
    },
    {
      path: 'todo-projects',
        // loadChildren: 'app/+forms/todo-projects/todo-projects.module#TodoProjectsModule',
      loadChildren: () => import('./todo-projects/todo-projects.module')
        .then((m) => m.TodoProjectsModule),
      data: {pageTitle: 'TodoProjects'}
    },
    {
      path: 'todo-mission/:project_id',
        // loadChildren: 'app/+forms/todo-mission/todo-mission.module#TodoMissionModule',
      loadChildren: () => import('./todo-mission/todo-mission.module')
        .then((m) => m.TodoMissionModule),
      data: {pageTitle: 'TodoMission'}
    }
];

export const routing = RouterModule.forChild(routes);
