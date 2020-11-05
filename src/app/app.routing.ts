/**
 * Created by griga on 7/11/16.
 */
import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";
import {AuthLayoutComponent} from "./shared/layout/app-layouts/auth-layout.component";
import { ModuleWithProviders } from "@angular/core";

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: {pageTitle: 'Home'},
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: 'account',
        loadChildren: () => import('./+account/account.module')
          .then((m) => m.AccountModule),
        data: {pageTitle: 'Account'}
      },
      {
        path: 'app-views',
        loadChildren: () => import('./+app-views/app-views.module')
          .then((m) => m.AppViewsModule),
        data: {pageTitle: 'App Views'}
      },
      {
        path: 'assets-management',
        loadChildren: () => import('./+assets-management/assets-management.module')
          .then((m) => m.AssetsManagementModule),
        data: {pageTitle: 'AssetsManagement'}
      },
      {
        path: 'customer-management',
        loadChildren: () => import('./+customer-management/customer-management.module')
          .then((m) => m.CustomerManagementModule),
        data: {pageTitle: 'CustomerManagement'}
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./+dashboard/dashboard.module')
          .then((m) => m.DashboardModule),
        data: {pageTitle: 'Dashboard'}
      },
      {
        path: 'equipment',
        loadChildren: () => import('./+equipment/equipment.module')
          .then((m) => m.EquipmentModule),
        data: {pageTitle: 'Equipment'}
      },
      {
        path: 'file',
        loadChildren: () => import('./+file/file.module')
          .then((m) => m.FileModule),
        data: {pageTitle: 'File'}
      },
      {
        path: 'forms',
        loadChildren: () => import('./+forms/forms-showcase.module')
          .then((m) => m.FormsShowcaseModule),
        data: {pageTitle: 'Forms'}
      },
      {
        path: 'inventory-management',
        loadChildren: () => import('./+inventory-management/inventory-management.module')
          .then((m) => m.InventoryManagementModule),
        data: {pageTitle: 'InventoryManagement'}
      },
      {
          path: 'iot',
          loadChildren: () => import('./+iot/iot.module')
            .then((m) => m.IotModule),
          data: {pageTitle: 'Iot'}
      },
      {
        path: 'mail',
        loadChildren: () => import('./+mail/mail.module')
          .then((m) => m.MailModule),
        data: {pageTitle: 'Mail'}
      },
      {
        path: 'management',
        loadChildren: () => import('./+management/management.module')
          .then((m) => m.ManagementModule),
        data: {pageTitle: 'Management'}
      },
      {
        path: 'medical',
        loadChildren: () => import('./+medical/medical.module')
          .then((m) => m.MedicalModule),
        data: {pageTitle: 'Medical'}
      },
      {
        path: 'miscellaneous',
        loadChildren: () => import('./+miscellaneous/miscellaneous.module')
          .then((m) => m.MiscellaneousModule),
        data: {pageTitle: 'Miscellaneous'}
      },
      {
        path: 'nfc',
        loadChildren: () => import('./+nfc/nfc.module')
          .then((m) => m.NfcModule),
        data: {pageTitle: 'Nfc'}
      },
      {
        path: 'process',
        loadChildren: () => import('./+process/process.module')
          .then((m) => m.ProcessModule),
        data: {pageTitle: 'Process'}
      },
      {
        path: 'procurement-management',
        loadChildren: () => import('./+procurement-management/procurement-management.module')
          .then((m) => m.ProcurementManagementModule),
        data: {pageTitle: 'ProcurementManagement'}
      },
      {
        path: 'sales-management',
        loadChildren: () => import('./+sales-management/sales-management.module')
          .then((m) => m.SalesManagementModule),
        data: {pageTitle: 'SalesManagement'}
      },
      {
        path: 'tables',
        loadChildren: () => import('./+tables/tables.module')
          .then((m) => m.TablesModule),
        data: {pageTitle: 'Tables'}
      },
      {
        path: 'to-do',
        loadChildren: () => import('./+to-do/to-do.module')
          .then((m) => m.ToDoModule),
        data: {pageTitle: 'ToDo'}
      },
      {
        path: 'after-sales',
        loadChildren: () => import('./after-sales/after-sales.module')
          .then((m) => m.AfterSalesModule),
        data: {pageTitle: 'AfterSales'}
      },
      {
          path: 'data-page',
          loadChildren: () => import('./data-page/data-page.module')
            .then((m) => m.DataPageModule),
          data: {pageTitle: 'DataPage'}
      },
      {
        path: 'mask-setting',
        loadChildren: () => import('./mask-setting/mask-setting.module')
          .then((m) => m.MaskSettingModule),
        data: {pageTitle: 'MaskSetting'}
      },
      {
        path: 'marketing',
        loadChildren: () => import('./marketing/marketing.module')
          .then((m) => m.MarketingModule),
        data: {pageTitle: 'Marketing'}
      },
      {
        path: 'online-retailers',
        loadChildren: () => import('./online-retailers/online-retailers.module')
          .then((m) => m.OnlineRetailersModule),
        data: {pageTitle: 'OnlineRetailers'}
      }
    ]
  },
    {path: 'auth', component: AuthLayoutComponent,
        // loadChildren: 'app/+auth/auth.module#AuthModule'
        loadChildren: () => import('./+auth/auth.module')
            .then((m) => m.AuthModule),
    },
  // {path: '**', redirectTo: 'miscellaneous/error404'}
];

// export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes, {useHash: true});
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

