import {Routes, RouterModule} from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: 'social', pathMatch: 'full'
  },
    {
      path: 'dynamic-wall',
      loadChildren: () => import('./dynamic-wall/dynamic-wall.module')
        .then((m) => m.DynamicWallModule),
    },
    {
      path: 'social',
      loadChildren: () => import('./+social/social.module')
        .then((m) => m.SocialModule),
    }
];
export const routing = RouterModule.forChild(routes);
