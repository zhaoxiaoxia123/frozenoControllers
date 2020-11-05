import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'nfc-pcsc',
        loadChildren: () => import('./nfc-pcsc/nfc-pcsc.module')
          .then((m) => m.NfcPcscModule),
        data: {pageTitle: 'Nfc'}
    },

];

export const routing = RouterModule.forChild(routes);
