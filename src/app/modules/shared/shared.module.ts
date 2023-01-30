import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LabelBooleanComponent } from './components/label-boolean/label-boolean.component';
import { LabelCompletedComponent } from './components/label-completed/label-completed.component';
import { LabelActiveComponent } from './components/label-active/label-active.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TxStatusComponent } from './components/tx-status/tx-status.component';

@NgModule({
  declarations: [LabelBooleanComponent, LabelCompletedComponent, LabelActiveComponent, TxStatusComponent],
  entryComponents: [LabelBooleanComponent, LabelCompletedComponent, LabelActiveComponent, TxStatusComponent],
  imports: [
    CommonModule,
  //  HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
 //   NgxPaginationModule,
  //  PipesModule,
    NgbModule,
    Ng2SmartTableModule,
  //  MultiselectDropdownModule,
    PerfectScrollbarModule,
  //   SweetAlert2Module.forRoot({
  //     buttonsStyling: false,
  //     customClass: 'modal-content',
  //     confirmButtonClass: 'btn btn-primary',
  //     cancelButtonClass: 'btn'
  // }),
  // AgmCoreModule.forRoot({
  //   apiKey: 'AIzaSyCeXaOKfJXQZuh-3wZmMmYSt5NruUJPVgU',
  //   libraries: ["places"]
  //  }),
  
   NgxChartsModule,
   BsDatepickerModule.forRoot(),
 
  ],
  exports: [
    CommonModule,
//    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
//    NgxPaginationModule,
 //   PipesModule,
    NgbModule,
    Ng2SmartTableModule,
    MultiselectDropdownModule,
    LabelBooleanComponent,
    LabelCompletedComponent,
    LabelActiveComponent,
  //  GoogleMapsComponent,
 //   AgmCoreModule,
  //  FlexmonsterPivotModule,
    PerfectScrollbarModule,
    NgxChartsModule,
    BsDatepickerModule
  ]
})
export class SharedModule {
  constructor() {
  }
}
