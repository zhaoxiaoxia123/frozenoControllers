import {Routes, RouterModule} from "@angular/router";

export const routes:Routes = [
  {
    path: 'login',
    loadChildren: () => import('./+login/login.module')
      .then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./+register/register.module')
      .then((m) => m.RegisterModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./+forgot/forgot.module')
      .then((m) => m.ForgotModule),
  },
  {
    path: 'form-binding',
    loadChildren: () => import('./form-binding/form-binding.module')
      .then((m) => m.FormBindingModule),
  },
  {
    path: 'locked',
    loadChildren: () => import('./+locked/locked.module')
      .then((m) => m.LockedModule),
  }
];

export const routing = RouterModule.forChild(routes);
