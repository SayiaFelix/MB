import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { CustomersRoutingModule } from './customers-routing.module';
import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ListActiveCustomersComponent } from './list-active-customers/list-active-customers.component';

@NgModule({
  declarations: [ListActiveCustomersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CustomersRoutingModule,
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
export class CustomersModule {}
