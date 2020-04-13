
import {RouterModule, Routes} from "@angular/router";


export const routes:Routes = [
  {
        path: 'helmet-projects',
        loadChildren: './helmet-projects/helmet-projects.module#HelmetProjectsModule'
  },
   ];

export const routing = RouterModule.forChild(routes);
