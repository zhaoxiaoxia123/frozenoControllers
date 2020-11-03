
import {RouterModule, Routes} from "@angular/router";


export const routes:Routes = [
  {
      path: 'helmet-projects',
        // loadChildren: './helmet-projects/helmet-projects.module#HelmetProjectsModule'
    loadChildren: () => import('./helmet-projects/helmet-projects.module')
      .then((m) => m.HelmetProjectsModule),
  },
 ];

export const routing = RouterModule.forChild(routes);
