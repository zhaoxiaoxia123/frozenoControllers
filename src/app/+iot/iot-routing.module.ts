import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'station-block',
        // loadChildren: 'app/+iot/station-block/station-block.module#StationBlockModule',
        loadChildren: () => import('./station-block/station-block.module')
          .then((m) => m.StationBlockModule),
        data: {pageTitle: 'StationBlock'}
    },
    {
        path: 'iot-control',
        // loadChildren: 'app/+iot/iot-control/iot-control.module#IotControlModule',
        loadChildren: () => import('./iot-control/iot-control.module')
          .then((m) => m.IotControlModule),
        data: {pageTitle: 'IotControl'}
    },

];

export const routing = RouterModule.forChild(routes);