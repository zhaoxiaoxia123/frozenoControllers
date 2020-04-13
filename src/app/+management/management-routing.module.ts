import { Routes, RouterModule } from '@angular/router';

export const routes:Routes = [
    {
        path: 'enterprise',
        loadChildren: 'app/+management/setting-enterprise/setting-enterprise.module#SettingEnterpriseModule',
        data: {pageTitle: 'Setting Enterprise'}
    },
    {
        path: 'enterprise1',
        loadChildren: 'app/+management/setting-enterprise1/setting-enterprise1.module#SettingEnterprise1Module',
        data: {pageTitle: 'Setting Enterprise1'}
    },
    {
        path: 'enterprise2',
        loadChildren: 'app/+management/setting-enterprise2/setting-enterprise2.module#SettingEnterprise2Module',
        data: {pageTitle: 'Setting Enterprise2'}
    },
    {
        path: 'setting-equipment',
        loadChildren: 'app/+management/setting-equipment/setting-equipment.module#SettingEquipmentModule',
        data: {pageTitle: 'Setting Equipment'}
    },
    {
        path: 'setting-personnel',
        loadChildren: 'app/+management/setting-personnel/setting-personnel.module#SettingPersonnelModule',
        data: {pageTitle: 'Setting Personnel'}
    },
    {
        path: 'setting-departmentnew',
        loadChildren: 'app/+management/setting-departmentnew/setting-departmentnew.module#SettingDepartmentnewModule',
        data: {pageTitle: 'Setting Departmentnew'}
    },
    {
        path: 'setting-honor',
        loadChildren: 'app/+management/setting-honor/setting-honor.module#SettingHonorModule',
        data: {pageTitle: 'Setting Honor'}
    },
    {
        path: 'setting-repertory',
        loadChildren: 'app/+management/setting-repertory/setting-repertory.module#SettingRepertoryModule',
        data: {pageTitle: 'Setting Repertory'}
    },
    {
        path: 'setting-archives',
        loadChildren: 'app/+management/setting-archives/setting-archives.module#SettingArchivesModule',
        data: {pageTitle: 'Setting Archives'}
    },
    {
        path: 'setting-affiliation',
        loadChildren: 'app/+management/setting-affiliation/setting-affiliation.module#SettingAffiliationModule',
        data: {pageTitle: 'Setting Affiliation'}
    },
    {
        path: 'setting-openness',
        loadChildren: 'app/+management/setting-openness/setting-openness.module#SettingOpennessModule',
        data: {pageTitle: 'Setting Openness'}
    },
    {
        path: 'setting-formwork',
        loadChildren: 'app/+management/setting-formwork/setting-formwork.module#SettingFormworkModule',
        data: {pageTitle: 'Setting Formwork'}
    },
    {
        path: 'setting-labellinga',
        loadChildren: 'app/+management/setting-labellinga/setting-labellinga.module#SettingLabellingaModule',
        data: {pageTitle: 'Setting Labellinga'}
    }];

export const routing = RouterModule.forChild(routes);