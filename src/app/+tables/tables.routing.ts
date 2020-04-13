import {RouterModule, Routes} from "@angular/router";
import {ListStaffComponent} from './list-staff/list-staff.component';
import {ListInventoryComponent} from './list-inventory/list-inventory.component';

export const routes:Routes = [

  {
    path: 'staff',
    component: ListStaffComponent ,
    data: {pageTitle: 'Staff'}
  },
    {
        path: 'inventory',
        component: ListInventoryComponent,
        data: {pageTitle: 'Inventory'}
    }
];


export const routing = RouterModule.forChild(routes)
