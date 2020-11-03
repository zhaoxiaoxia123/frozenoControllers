import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'assets-category',
        // loadChildren: 'app/+assets-management/assets-category/assets-category.module#AssetsCategoryModule',
        loadChildren: () => import('./assets-category/assets-category.module')
          .then((m) => m.AssetsCategoryModule),
        data: {pageTitle: 'AssetsCategory'}
    },
    {
        path: 'assets-issue',
        // loadChildren: 'app/+assets-management/assets-issue/assets-issue.module#AssetsIssueModule',
        loadChildren: () => import('./assets-issue/assets-issue.module')
          .then((m) => m.AssetsIssueModule),
        data: {pageTitle: 'AssetsIssue'}
    },
    {
        path: 'assets-listing',
        // loadChildren: 'app/+assets-management/assets-listing/assets-listing.module#AssetsListingModule',
        loadChildren: () => import('./assets-listing/assets-listing.module')
          .then((m) => m.AssetsListingModule),
        data: {pageTitle: 'AssetsListing'}
    },
    {
        path: 'assets-return',
        // loadChildren: 'app/+assets-management/assets-return/assets-return.module#AssetsReturnModule',
        loadChildren: () => import('./assets-return/assets-return.module')
          .then((m) => m.AssetsReturnModule),
        data: {pageTitle: 'AssetsReturn'}
    },
    {
        path: 'assets-scrap',
        // loadChildren: 'app/+assets-management/assets-scrap/assets-scrap.module#AssetsScrapModule',
        loadChildren: () => import('./assets-scrap/assets-scrap.module')
          .then((m) => m.AssetsScrapModule),
        data: {pageTitle: 'AssetsScrap'}
    },
    {
        path: 'assets-statistical',
        // loadChildren: 'app/+assets-management/assets-statistical/assets-statistical.module#AssetsStatisticalModule',
        loadChildren: () => import('./assets-statistical/assets-statistical.module')
          .then((m) => m.AssetsStatisticalModule),
        data: {pageTitle: 'AssetsStatistical'}
    },
];

export const routing = RouterModule.forChild(routes);
