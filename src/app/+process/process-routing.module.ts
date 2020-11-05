import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'approval-process/:info',
        loadChildren: () => import('./approval-process/approval-process.module')
          .then((m) => m.ApprovalProcessModule),
        data: {pageTitle: 'ApprovalProcess'}
    },
    {
        path: 'process-initiate',
        loadChildren: () => import('./process-initiate/process-initiate.module')
          .then((m) => m.ProcessInitiateModule),
        data: {pageTitle: 'ProcessInitiate'}
    },
    {
        path: 'initiate-evection',
        loadChildren: () => import('./initiate-evection/initiate-evection.module')
          .then((m) => m.InitiateEvectionModule),
        data: {pageTitle: 'InitiateEvection'}
    },
    {
        path: 'initiate-general',
        loadChildren: () => import('./initiate-general/initiate-general.module')
          .then((m) => m.InitiateGeneralModule),
        data: {pageTitle: 'InitiateGeneral'}
    },
    {
        path: 'initiate-goout',
        loadChildren: () => import('./initiate-goout/initiate-goout.module')
          .then((m) => m.InitiateGooutModule),
        data: {pageTitle: 'InitiateGoout'}
    },
    {
        path: 'initiate-leave',
        loadChildren: () => import('./initiate-leave/initiate-leave.module')
          .then((m) => m.InitiateLeaveModule),
        data: {pageTitle: 'InitiateLeave'}
    },
    {
        path: 'initiate-requite',
        loadChildren: () => import('./initiate-requite/initiate-requite.module')
          .then((m) => m.InitiateRequiteModule),
        data: {pageTitle: 'InitiateRequite'}
    },
];

export const routing = RouterModule.forChild(routes);