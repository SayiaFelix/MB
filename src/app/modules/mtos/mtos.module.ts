import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { MtosRoutingModule } from './mtos-routing.module';
import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ListOrganizationsComponent } from './organizations/list-organizations/list-organizations.component';
import { MtosComponent } from './mtos.component';
import { ValidationRequestsComponent } from './payout-validation/validation-requests/validation-requests.component';
import { WithdrawalRequestsComponent } from './withdrawal-requests/withdrawal-requests/withdrawal-requests.component';
import { BulkUploadsComponent } from './bulk-uploads/bulk-uploads.component';
import { SuccessfulMomoTransactionsComponent } from './successful-momo-transactions/successful-momo-transactions.component';

@NgModule({
  declarations: [
  MtosComponent,
  ListOrganizationsComponent,
  ValidationRequestsComponent,
  WithdrawalRequestsComponent,
  BulkUploadsComponent,
  SuccessfulMomoTransactionsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MtosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule
  ], 
  entryComponents: [
    
  ]
})
export class MtosModule {}
