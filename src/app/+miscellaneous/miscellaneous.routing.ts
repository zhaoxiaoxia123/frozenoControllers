import {Routes, RouterModule} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'error404'
  },
  {
    path: 'error404',
    // loadChildren: './+error404/error404.module#Error404Module'
    loadChildren: () => import('./+error404/error404.module')
      .then((m) => m.Error404Module),
  },
  {
    path: 'error500',
    // loadChildren: './+error500/error500.module#Error500Module'
    loadChildren: () => import('./+error500/error500.module')
      .then((m) => m.Error500Module),
  }
];

export const routing = RouterModule.forChild(routes);




