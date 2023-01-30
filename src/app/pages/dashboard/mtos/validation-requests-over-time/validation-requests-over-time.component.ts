import { Component, NgModule } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-validation-requests-over-time',
  templateUrl: './validation-requests-over-time.component.html',
  styleUrls: ['./validation-requests-over-time.component.scss']
})
export class ValidationRequestsOverTimeComponent  {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    
    title: {
      text: 'Withdrawal transactions over time (monthly)'
  },

  subtitle: {
      text: 'Monthly'
  },

  yAxis: {
      title: {
          text: 'No. of transactions'
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
      data: [400000, 500000 , 600000, 650000, 700000, 800000, 900000],
      type: undefined
    },
    {
      name: 'Small World',
      data: [ 500000 , 700000, 750000, 780000, 900000, 1000000 , 1200000],
      type: undefined
    },
    {
      name: 'RIA',
      data: [ 400000, 550000, 700000, 600000, 500000, 500000 , 400000 ],
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


