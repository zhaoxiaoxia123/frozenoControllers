import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dealer-finance',
        // loadChildren: 'app/online-retailers/dealer-finance/dealer-finance.module#DealerFinanceModule',
        loadChildren: () => import('./dealer-finance/dealer-finance.module')
          .then((m) => m.DealerFinanceModule),
        data: {pageTitle: 'dealer-finance'}
    },
    {
        path: 'dealer-order',
        // loadChildren: 'app/online-retailers/dealer-order/dealer-order.module#DealerOrderModule',
        loadChildren: () => import('./dealer-order/dealer-order.module')
          .then((m) => m.DealerOrderModule),
        data: {pageTitle: 'dealer-order'}
    },
    {
        path: 'home',
        // loadChildren: 'app/online-retailers/home/home.module#HomeModule',
        loadChildren: () => import('./home/home.module')
          .then((m) => m.HomeModule),
        data: {pageTitle: 'home'}
    },
    {
        path: 'member',
        // loadChildren: 'app/online-retailers/member/member.module#MemberModule',
        loadChildren: () => import('./member/member.module')
          .then((m) => m.MemberModule),
        data: {pageTitle: 'member'}
    },
    {
        path: 'my',
        // loadChildren: 'app/online-retailers/my/my.module#MyModule',
        loadChildren: () => import('./my/my.module')
          .then((m) => m.MyModule),
        data: {pageTitle: 'my'}
    },
    {
        path: 'news',
        // loadChildren: 'app/online-retailers/news/news.module#NewsModule',
        loadChildren: () => import('./news/news.module')
          .then((m) => m.NewsModule),
        data: {pageTitle: 'news'}
    },
    {
        path: 'team',
        // loadChildren: 'app/online-retailers/team/team.module#TeamModule',
        loadChildren: () => import('./team/team.module')
          .then((m) => m.TeamModule),
        data: {pageTitle: 'team'}
    },
    {
        path: 'team-view',
        // loadChildren: 'app/online-retailers/team-view/team-view.module#TeamViewModule',
        loadChildren: () => import('./team-view/team-view.module')
          .then((m) => m.TeamViewModule),
        data: {pageTitle: 'team-view'}
    },
    {
        path: 'dealer-money',
        // loadChildren: 'app/online-retailers/dealer-money/dealer-money.module#DealerMoneyModule',
        loadChildren: () => import('./dealer-money/dealer-money.module')
          .then((m) => m.DealerMoneyModule),
        data: {pageTitle: 'dealer-money'}
    },
    {
        path: 'dealer-orders',
        // loadChildren: 'app/online-retailers/dealer-orders/dealer-orders.module#DealerOrdersModule',
        loadChildren: () => import('./dealer-orders/dealer-orders.module')
          .then((m) => m.DealerOrdersModule),
        data: {pageTitle: 'dealer-orders'}
    },
    {
        path: 'two-team',
        // loadChildren: 'app/online-retailers/two-team/two-team.module#TwoTeamModule',
        loadChildren: () => import('./two-team/two-team.module')
          .then((m) => m.TwoTeamModule),
        data: {pageTitle: 'two-team'}
    },
    {
        path: 'customer-details',
        // loadChildren: 'app/online-retailers/customer-details/customer-details.module#CustomerDetailsModule',
        loadChildren: () => import('./customer-details/customer-details.module')
          .then((m) => m.CustomerDetailsModule),
        data: {pageTitle: 'customer-details'}
    },
    {
        path: 'group',
        // loadChildren: 'app/online-retailers/group/group.module#GroupModule',
        loadChildren: () => import('./group/group.module')
          .then((m) => m.GroupModule),
        data: {pageTitle: 'group'}
    }
];

export const routing = RouterModule.forChild(routes);
