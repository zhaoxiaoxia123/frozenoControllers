import {Routes, RouterModule} from "@angular/router";

export const routes:Routes = [
  {
    path: 'login',
    // loadChildren: './+login/login.module#LoginModule'
    loadChildren: () => import('./+login/login.module')
      .then((m) => m.LoginModule),
  },
  {
    path: 'register',
    // loadChildren: './+register/register.module#RegisterModule'
    loadChildren: () => import('./+register/register.module')
      .then((m) => m.RegisterModule),
  },
  {
    path: 'forgot-password',
    // loadChildren: './+forgot/forgot.module#ForgotModule'
    loadChildren: () => import('./+forgot/forgot.module')
      .then((m) => m.ForgotModule),
  },
  {
    path: 'form-binding',
      // loadChildren: './form-binding/form-binding.module#FormBindingModule'
    loadChildren: () => import('./form-binding/form-binding.module')
      .then((m) => m.FormBindingModule),
  },
  {
    path: 'locked',
    // loadChildren: './+locked/locked.module#LockedModule'
    loadChildren: () => import('./+locked/locked.module')
      .then((m) => m.LockedModule),
  }
];

export const routing = RouterModule.forChild(routes);
