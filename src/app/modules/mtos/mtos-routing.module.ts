import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BulkUploadsComponent } from './bulk-uploads/bulk-uploads.component';
import { MtosComponent } from './mtos.component';
import { ListOrganizationsComponent } from './organizations/list-organizations/list-organizations.component';
import { ValidationRequestsComponent } from './payout-validation/validation-requests/validation-requests.component';
import { SuccessfulMomoTransactionsComponent } from './successful-momo-transactions/successful-momo-transactions.component';
import { WithdrawalRequestsComponent } from './withdrawal-requests/withdrawal-requests/withdrawal-requests.component';

const routes: Routes = [
  {
    path: '',
     component: MtosComponent,
    children: [
      {
        path: 'companies',
        component: ListOrganizationsComponent,
      },
      {
        path: 'payout-validation',
        component: ValidationRequestsComponent,
      },
      {
        path: 'withdrawal-requests',
        component: WithdrawalRequestsComponent,
      },
       {
        path: 'bulk-uploads',
        component: BulkUploadsComponent,
      },
      {
        path: 'succesful-txns',
        component: SuccessfulMomoTransactionsComponent,
      },
      // {
      //   path: 'products',
      //   component: ProductsComponent,
      // },
      // {
      //   path: 'product/add',
      //   component: ProductEditComponent
      // },
      // {
      //   path: 'product/edit',
      //   component: ProductEditComponent
      // },
      // {
      //   path: 'product/edit/:id',
      //   component: ProductEditComponent
      // },
      // { path: '', redirectTo: 'customers', pathMatch: 'full' },
      // { path: '**', redirectTo: 'customers', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtosRoutingModule {} 
