import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardsModule } from '../../_metronic/partials/content/dashboards/dashboards.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ValidationRequestsByMtoComponent } from './mtos/validation-requests-by-mto/validation-requests-by-mto.component';
import { WithdrawalsByMethodTypeComponent } from './mtos/withdrawals-by-method-type/withdrawals-by-method-type.component';
import { ValidationRequestsOverTimeComponent } from './mtos/validation-requests-over-time/validation-requests-over-time.component';
import { ValueOfTransactionsOtComponent } from './mtos/value-of-transactions-ot/value-of-transactions-ot.component';
import { TransactionsByMomoBarComponent } from './mtos/transactions-by-momo-bar/transactions-by-momo-bar.component';

@NgModule({
  declarations: [DashboardComponent, ValidationRequestsByMtoComponent, WithdrawalsByMethodTypeComponent, ValidationRequestsOverTimeComponent, ValueOfTransactionsOtComponent, TransactionsByMomoBarComponent],
  imports: [
   // NgxChartsModule,
    HighchartsChartModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    DashboardsModule,
  ],
})
export class DashboardModule {}
