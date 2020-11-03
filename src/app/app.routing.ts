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
        // loadChildren: 'app/+account/account.module#AccountModule',
        loadChildren: () => import('./+account/account.module')
          .then((m) => m.AccountModule),
        data: {pageTitle: 'Account'}
      },
      {
        path: 'app-views',
        // loadChildren: 'app/+app-views/app-views.module#AppViewsModule',
        loadChildren: () => import('./+app-views/app-views.module')
          .then((m) => m.AppViewsModule),
        data: {pageTitle: 'App Views'}
      },
      {
        path: 'assets-management',
        // loadChildren: 'app/+assets-management/assets-management.module#AssetsManagementModule',
        loadChildren: () => import('./+assets-management/assets-management.module')
          .then((m) => m.AssetsManagementModule),
        data: {pageTitle: 'AssetsManagement'}
      },
      {path: 'auth', component: AuthLayoutComponent,
        // loadChildren: 'app/+auth/auth.module#AuthModule'
        loadChildren: () => import('./+auth/auth.module')
          .then((m) => m.AuthModule),
      },
      {
        path: 'customer-management',
        // loadChildren: 'app/+customer-management/customer-management.module#CustomerManagementModule',
        loadChildren: () => import('./+customer-management/customer-management.module')
          .then((m) => m.CustomerManagementModule),
        data: {pageTitle: 'CustomerManagement'}
      },
      {
        path: 'dashboard',
        // loadChildren: 'app/+dashboard/dashboard.module#DashboardModule',
        loadChildren: () => import('./+dashboard/dashboard.module')
          .then((m) => m.DashboardModule),
        data: {pageTitle: 'Dashboard'}
      },
      {
        path: 'equipment',
        // loadChildren: 'app/+equipment/equipment.module#EquipmentModule',
        loadChildren: () => import('./+equipment/equipment.module')
          .then((m) => m.EquipmentModule),
        data: {pageTitle: 'Equipment'}
      },
      {
        path: 'file',
          // loadChildren: 'app/+file/file.module#FileModule',
        loadChildren: () => import('./+file/file.module')
          .then((m) => m.FileModule),
        data: {pageTitle: 'File'}
      },
      {
        path: 'forms',
        // loadChildren: 'app/+forms/forms-showcase.module#FormsShowcaseModule',
        loadChildren: () => import('./+forms/forms-showcase.module')
          .then((m) => m.FormsShowcaseModule),
        data: {pageTitle: 'Forms'}
      },
      {
        path: 'inventory-management',
        // loadChildren: 'app/+inventory-management/inventory-management.module#InventoryManagementModule',
        loadChildren: () => import('./+inventory-management/inventory-management.module')
          .then((m) => m.InventoryManagementModule),
        data: {pageTitle: 'InventoryManagement'}
      },
      {
          path: 'iot',
          // loadChildren: 'app/+iot/iot.module#IotModule',
          loadChildren: () => import('./+iot/iot.module')
            .then((m) => m.IotModule),
          data: {pageTitle: 'Iot'}
      },
      {
        path: 'mail',
        // loadChildren: 'app/+mail/mail.module#MailModule',
        loadChildren: () => import('./+mail/mail.module')
          .then((m) => m.MailModule),
        data: {pageTitle: 'Mail'}
      },
      {
        path: 'management',
        // loadChildren: 'app/+management/management.module#ManagementModule',
        loadChildren: () => import('./+management/management.module')
          .then((m) => m.ManagementModule),
        data: {pageTitle: 'Management'}
      },
      {
        path: 'medical',
        // loadChildren: 'app/+medical/medical.module#MedicalModule',
        loadChildren: () => import('./+medical/medical.module')
          .then((m) => m.MedicalModule),
        data: {pageTitle: 'Medical'}
      },
      {
        path: 'miscellaneous',
        // loadChildren: 'app/+miscellaneous/miscellaneous.module#MiscellaneousModule',
        loadChildren: () => import('./+miscellaneous/miscellaneous.module')
          .then((m) => m.MiscellaneousModule),
        data: {pageTitle: 'Miscellaneous'}
      },
      {
          path: 'nfc',
          // loadChildren: 'app/+nfc/nfc.module#NfcModule',
        loadChildren: () => import('./+nfc/nfc.module')
          .then((m) => m.NfcModule),
          data: {pageTitle: 'Nfc'}
      },
      {
        path: 'process',
        // loadChildren: 'app/+process/process.module#ProcessModule',
        loadChildren: () => import('./+process/process.module')
          .then((m) => m.ProcessModule),
        data: {pageTitle: 'Process'}
      },
      {
        path: 'procurement-management',
        // loadChildren: 'app/+procurement-management/procurement-management.module#ProcurementManagementModule',
        loadChildren: () => import('./+procurement-management/procurement-management.module')
          .then((m) => m.ProcurementManagementModule),
        data: {pageTitle: 'ProcurementManagement'}
      },
      {
        path: 'sales-management',
        // loadChildren: 'app/+sales-management/sales-management.module#SalesManagementModule',
        loadChildren: () => import('./+sales-management/sales-management.module')
          .then((m) => m.SalesManagementModule),
        data: {pageTitle: 'SalesManagement'}
      },
      {
        path: 'tables',
        // loadChildren: 'app/+tables/tables.module#TablesModule',
        loadChildren: () => import('./+tables/tables.module')
          .then((m) => m.TablesModule),
        data: {pageTitle: 'Tables'}
      },
      {
        path: 'to-do',
        // loadChildren: 'app/+to-do/to-do.module#ToDoModule',
        loadChildren: () => import('./+to-do/to-do.module')
          .then((m) => m.ToDoModule),
        data: {pageTitle: 'ToDo'}
      },
      {
        path: 'after-sales',
        // loadChildren: 'app/after-sales/after-sales.module#AfterSalesModule',
        loadChildren: () => import('./after-sales/after-sales.module')
          .then((m) => m.AfterSalesModule),
        data: {pageTitle: 'AfterSales'}
      },
      {
          path: 'data-page',
          // loadChildren: 'app/data-page/data-page.module#DataPageModule',
          loadChildren: () => import('./data-page/data-page.module')
            .then((m) => m.DataPageModule),
          data: {pageTitle: 'DataPage'}
      },
      {
        path: 'mask-setting',
        // loadChildren: 'app/mask-setting/mask-setting.module#MaskSettingModule',
        loadChildren: () => import('./mask-setting/mask-setting.module')
          .then((m) => m.MaskSettingModule),
        data: {pageTitle: 'MaskSetting'}
      },
      {
          path: 'marketing',
          // loadChildren: 'app/marketing/marketing.module#MarketingModule',
        loadChildren: () => import('./marketing/marketing.module')
          .then((m) => m.MarketingModule),
          data: {pageTitle: 'Marketing'}
      },
      {
        path: 'online-retailers',
          // loadChildren: 'app/online-retailers/online-retailers.module#OnlineRetailersModule',
        loadChildren: () => import('./online-retailers/online-retailers.module')
          .then((m) => m.OnlineRetailersModule),
        data: {pageTitle: 'OnlineRetailers'}
      }
    ]
  },
  // {path: '**', redirectTo: 'miscellaneous/error404'}
];

// export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes, {useHash: true});
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

