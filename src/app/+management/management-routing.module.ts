import { Routes, RouterModule } from '@angular/router';

export const routes:Routes = [
    {
        path: 'enterprise',
        // loadChildren: 'app/+management/setting-enterprise/setting-enterprise.module#SettingEnterpriseModule',
        loadChildren: () => import('./setting-enterprise/setting-enterprise.module')
          .then((m) => m.SettingEnterpriseModule),
        data: {pageTitle: 'Setting Enterprise'}
    },
    {
        path: 'enterprise1',
        // loadChildren: 'app/+management/setting-enterprise1/setting-enterprise1.module#SettingEnterprise1Module',
        loadChildren: () => import('./setting-enterprise1/setting-enterprise1.module')
          .then((m) => m.SettingEnterprise1Module),
        data: {pageTitle: 'Setting Enterprise1'}
    },
    {
        path: 'enterprise2',
        // loadChildren: 'app/+management/setting-enterprise2/setting-enterprise2.module#SettingEnterprise2Module',
        loadChildren: () => import('./setting-enterprise2/setting-enterprise2.module')
          .then((m) => m.SettingEnterprise2Module),
        data: {pageTitle: 'Setting Enterprise2'}
    },
    {
        path: 'setting-equipment',
        // loadChildren: 'app/+management/setting-equipment/setting-equipment.module#SettingEquipmentModule',
        loadChildren: () => import('./setting-equipment/setting-equipment.module')
          .then((m) => m.SettingEquipmentModule),
        data: {pageTitle: 'Setting Equipment'}
    },
    {
        path: 'setting-personnel',
        // loadChildren: 'app/+management/setting-personnel/setting-personnel.module#SettingPersonnelModule',
        loadChildren: () => import('./setting-personnel/setting-personnel.module')
          .then((m) => m.SettingPersonnelModule),
        data: {pageTitle: 'Setting Personnel'}
    },
    {
        path: 'setting-departmentnew',
        // loadChildren: 'app/+management/setting-departmentnew/setting-departmentnew.module#SettingDepartmentnewModule',
        loadChildren: () => import('./setting-departmentnew/setting-departmentnew.module')
          .then((m) => m.SettingDepartmentnewModule),
        data: {pageTitle: 'Setting Departmentnew'}
    },
    {
        path: 'setting-honor',
        // loadChildren: 'app/+management/setting-honor/setting-honor.module#SettingHonorModule',
        loadChildren: () => import('./setting-honor/setting-honor.module')
          .then((m) => m.SettingHonorModule),
        data: {pageTitle: 'Setting Honor'}
    },
    {
        path: 'setting-repertory',
        // loadChildren: 'app/+management/setting-repertory/setting-repertory.module#SettingRepertoryModule',
        loadChildren: () => import('./setting-repertory/setting-repertory.module')
          .then((m) => m.SettingRepertoryModule),
        data: {pageTitle: 'Setting Repertory'}
    },
    {
        path: 'setting-archives',
        // loadChildren: 'app/+management/setting-archives/setting-archives.module#SettingArchivesModule',
        loadChildren: () => import('./setting-archives/setting-archives.module')
          .then((m) => m.SettingArchivesModule),
        data: {pageTitle: 'Setting Archives'}
    },
    {
        path: 'setting-affiliation',
        // loadChildren: 'app/+management/setting-affiliation/setting-affiliation.module#SettingAffiliationModule',
        loadChildren: () => import('./setting-affiliation/setting-affiliation.module')
          .then((m) => m.SettingAffiliationModule),
        data: {pageTitle: 'Setting Affiliation'}
    },
    {
        path: 'setting-openness',
        // loadChildren: 'app/+management/setting-openness/setting-openness.module#SettingOpennessModule',
        loadChildren: () => import('./setting-openness/setting-openness.module')
          .then((m) => m.SettingOpennessModule),
        data: {pageTitle: 'Setting Openness'}
    },
    {
        path: 'setting-formwork',
        // loadChildren: 'app/+management/setting-formwork/setting-formwork.module#SettingFormworkModule',
        loadChildren: () => import('./setting-formwork/setting-formwork.module')
          .then((m) => m.SettingFormworkModule),
        data: {pageTitle: 'Setting Formwork'}
    },
    {
        path: 'setting-labellinga',
        // loadChildren: 'app/+management/setting-labellinga/setting-labellinga.module#SettingLabellingaModule',
        loadChildren: () => import('./setting-labellinga/setting-labellinga.module')
          .then((m) => m.SettingLabellingaModule),
        data: {pageTitle: 'Setting Labellinga'}
    }];

export const routing = RouterModule.forChild(routes);