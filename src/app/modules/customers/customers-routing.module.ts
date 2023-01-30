import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListActiveCustomersComponent } from './list-active-customers/list-active-customers.component';

const routes: Routes = [
  {
    path: '',
  //   component: ListActiveCustomersComponent,
    children: [
      {
        path: 'active-customers',
  //      component: ListActiveCustomersComponent,
      },
    
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CustomersRoutingModule {}
