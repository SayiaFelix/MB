import { Component, NgModule } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-transactions-by-momo-bar',
  templateUrl: './transactions-by-momo-bar.component.html',
  styleUrls: ['./transactions-by-momo-bar.component.scss']
})
export class TransactionsByMomoBarComponent  {

 
  
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
  },
    title: {
      text: 'Withdrawal Transactions by MoMo (monthly)'
  },

  subtitle: {
      text: 'Monthly'
  },

  yAxis: {
      title: {
          text: 'Value of transactions (GHS)'
      }
  },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      x: 0,
      y: 0
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun' , 'Jul']
  },
    plotOptions: {
    //   line: {
    //     dataLabels: {
    //         enabled: true
    //     },
    //     enableMouseTracking: false
    // },
      
      series: {
        label: {
          connectorAllowed: false
        },
      }
    },
    series: [
      {
      name: 'Tigo Cash',
      data: [14000000, 15000000 , 16000000, 16500000, 17000000, 18000000, 19000000],
      type: undefined
    },
    {
      name: 'Airtel Money',
      data: [ 15000000 , 17000000, 17500000, 17800000, 19000000, 19000000 , 22000000],
      type: undefined
    },
    {
      name: 'MTN Money',
      data: [ 25000000 , 17000000, 7500000, 27800000, 18000000, 17000000 , 12000000],
      type: undefined
    },
    {
      name: 'Vodafone Cash',
      data: [ 14000000, 15500000, 17000000, 16000000, 15000000, 15000000 , 14000000 ],
      type: undefined
    }
  ]
  };

  constructor() {
    // Object.assign(this, { multi });
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}


