import {Routes, RouterModule} from '@angular/router';

export const routes: Routes = [
  {
    path: 'elements',
    loadChildren: 'app/+forms/+form-elements/form-elements.module#FormElementsModule',
    data: {pageTitle: 'Elements'}
  },
  {
    path: 'validation',
    loadChildren: 'app/+forms/+form-validation/form-validation.module#FormValidationModule',
    data: {pageTitle: 'Validation'}
  },
    {
        path: 'employees/:u_id',
        loadChildren: 'app/+forms/+add-employees/add-employees.module#AddEmployeesModule',
        data: {pageTitle: 'Employees'}
    },
    {
        path: 'inventory1/:storehouse_id',
        loadChildren: 'app/+forms/add-inventory1/add-inventory1.module#AddInventory1Module',
        data: {pageTitle: 'Inventory1'}
    },
    {
        path: 'todo-projects',
        loadChildren: 'app/+forms/todo-projects/todo-projects.module#TodoProjectsModule',
        data: {pageTitle: 'TodoProjects'}
    },
    {
        path: 'todo-mission/:project_id',
        loadChildren: 'app/+forms/todo-mission/todo-mission.module#TodoMissionModule',
        data: {pageTitle: 'TodoMission'}
    }
/*    {
        path: 'inventory1',
        loadChildren: 'app/+forms/add-inventory1/add-inventory1.module#AddInventory1Module',
        data: {pageTitle: 'Inventory1'}
    }*/
];

export const routing = RouterModule.forChild(routes);
