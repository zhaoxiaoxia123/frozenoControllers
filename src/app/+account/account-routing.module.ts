
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'account-company',
        // loadChildren: 'app/+account/account-company/account-company.module#AccountCompanyModule',
        loadChildren: () => import('./account-company/account-company.module')
          .then((m) => m.AccountCompanyModule),
        data: {pageTitle: 'AccountCompany'}
    },
    {
        path: 'account-permissions',
        // loadChildren: 'app/+account/account-permissions/account-permissions.module#AccountPermissionsModule',
        loadChildren: () => import('./account-permissions/account-permissions.module')
          .then((m) => m.AccountPermissionsModule),
        data: {pageTitle: 'AccountPermissions'}
    },
    {
        path: 'personal-settings',
        // loadChildren: 'app/+account/personal-settings/personal-settings.module#PersonalSettingsModule',
        loadChildren: () => import('./personal-settings/personal-settings.module')
          .then((m) => m.PersonalSettingsModule),
        data: {pageTitle: 'PersonalSettings'}
    },
    {
        path: 'account-admin',
        // loadChildren: 'app/+account/account-admin/account-admin.module#AccountAdminModule',
        loadChildren: () => import('./account-admin/account-admin.module')
          .then((m) => m.AccountAdminModule),
        data: {pageTitle: 'AccountAdmin'}
    },
    {
        path: 'account-menu',
        // loadChildren: 'app/+account/account-menu/account-menu.module#AccountMenuModule',
        loadChildren: () => import('./account-menu/account-menu.module')
          .then((m) => m.AccountMenuModule),
        data: {pageTitle: 'AccountMenu'}
    },
    {
        path: 'address-ip',
        // loadChildren: 'app/+account/address-ip/address-ip.module#AddressIpModule',
        loadChildren: () => import('./address-ip/address-ip.module')
          .then((m) => m.AddressIpModule),
        data: {pageTitle: 'AddressIp'}
    },
];

export const routing = RouterModule.forChild(routes);