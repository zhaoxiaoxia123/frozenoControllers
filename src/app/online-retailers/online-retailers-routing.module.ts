import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dealer-finance',
        loadChildren: () => import('./dealer-finance/dealer-finance.module')
          .then((m) => m.DealerFinanceModule),
        data: {pageTitle: 'dealer-finance'}
    },
    {
        path: 'dealer-order',
        loadChildren: () => import('./dealer-order/dealer-order.module')
          .then((m) => m.DealerOrderModule),
        data: {pageTitle: 'dealer-order'}
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module')
          .then((m) => m.HomeModule),
        data: {pageTitle: 'home'}
    },
    {
        path: 'member',
        loadChildren: () => import('./member/member.module')
          .then((m) => m.MemberModule),
        data: {pageTitle: 'member'}
    },
    {
        path: 'my',
        loadChildren: () => import('./my/my.module')
          .then((m) => m.MyModule),
        data: {pageTitle: 'my'}
    },
    {
        path: 'news',
        loadChildren: () => import('./news/news.module')
          .then((m) => m.NewsModule),
        data: {pageTitle: 'news'}
    },
    {
        path: 'team',
        loadChildren: () => import('./team/team.module')
          .then((m) => m.TeamModule),
        data: {pageTitle: 'team'}
    },
    {
        path: 'team-view',
        loadChildren: () => import('./team-view/team-view.module')
          .then((m) => m.TeamViewModule),
        data: {pageTitle: 'team-view'}
    },
    {
        path: 'dealer-money',
        loadChildren: () => import('./dealer-money/dealer-money.module')
          .then((m) => m.DealerMoneyModule),
        data: {pageTitle: 'dealer-money'}
    },
    {
        path: 'dealer-orders',
        loadChildren: () => import('./dealer-orders/dealer-orders.module')
          .then((m) => m.DealerOrdersModule),
        data: {pageTitle: 'dealer-orders'}
    },
    {
        path: 'two-team',
        loadChildren: () => import('./two-team/two-team.module')
          .then((m) => m.TwoTeamModule),
        data: {pageTitle: 'two-team'}
    },
    {
        path: 'customer-details',
        loadChildren: () => import('./customer-details/customer-details.module')
          .then((m) => m.CustomerDetailsModule),
        data: {pageTitle: 'customer-details'}
    },
    {
        path: 'group',
        loadChildren: () => import('./group/group.module')
          .then((m) => m.GroupModule),
        data: {pageTitle: 'group'}
    }
];

export const routing = RouterModule.forChild(routes);
