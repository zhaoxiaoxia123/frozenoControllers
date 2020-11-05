import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'station-block',
        loadChildren: () => import('./station-block/station-block.module')
          .then((m) => m.StationBlockModule),
        data: {pageTitle: 'StationBlock'}
    },
    {
        path: 'iot-control',
        loadChildren: () => import('./iot-control/iot-control.module')
          .then((m) => m.IotControlModule),
        data: {pageTitle: 'IotControl'}
    },

];

export const routing = RouterModule.forChild(routes);