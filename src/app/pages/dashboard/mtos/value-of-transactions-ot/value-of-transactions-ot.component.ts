import { Component, NgModule } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-value-of-transactions-ot',
  templateUrl: './value-of-transactions-ot.component.html',
  styleUrls: ['./value-of-transactions-ot.component.scss']
})
export class ValueOfTransactionsOtComponent  {

  
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    
    title: {
      text: 'value of transactions over time (monthly)'
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
      line: {
        dataLabels: {
            enabled: true
        },
        enableMouseTracking: false
    },
      
      series: {
        label: {
          connectorAllowed: false
        },
      }
    },
    series: [
      {
      name: 'Unity Link',
      data: [14000000, 15000000 , 16000000, 16500000, 17000000, 18000000, 19000000],
      type: undefined
    },
    {
      name: 'Small World',
      data: [ 15000000 , 17000000, 17500000, 17800000, 19000000, 19000000 , 22000000],
      type: undefined
    },
    {
      name: 'RIA',
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


