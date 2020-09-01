import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dealer-finance',
        loadChildren: 'app/online-retailers/dealer-finance/dealer-finance.module#DealerFinanceModule',
        data: {pageTitle: 'dealer-finance'}
    },
    {
        path: 'dealer-order',
        loadChildren: 'app/online-retailers/dealer-order/dealer-order.module#DealerOrderModule',
        data: {pageTitle: 'dealer-order'}
    },
    {
        path: 'home',
        loadChildren: 'app/online-retailers/home/home.module#HomeModule',
        data: {pageTitle: 'home'}
    },
    {
        path: 'member',
        loadChildren: 'app/online-retailers/member/member.module#MemberModule',
        data: {pageTitle: 'member'}
    },
    {
        path: 'my',
        loadChildren: 'app/online-retailers/my/my.module#MyModule',
        data: {pageTitle: 'my'}
    },
    {
        path: 'news',
        loadChildren: 'app/online-retailers/news/news.module#NewsModule',
        data: {pageTitle: 'news'}
    },
    {
        path: 'team',
        loadChildren: 'app/online-retailers/team/team.module#TeamModule',
        data: {pageTitle: 'team'}
    },
    {
        path: 'team-view',
        loadChildren: 'app/online-retailers/team-view/team-view.module#TeamViewModule',
        data: {pageTitle: 'team-view'}
    },
    {
        path: 'dealer-money',
        loadChildren: 'app/online-retailers/dealer-money/dealer-money.module#DealerMoneyModule',
        data: {pageTitle: 'dealer-money'}
    },
    {
        path: 'dealer-orders',
        loadChildren: 'app/online-retailers/dealer-orders/dealer-orders.module#DealerOrdersModule',
        data: {pageTitle: 'dealer-orders'}
    }
];

export const routing = RouterModule.forChild(routes);
