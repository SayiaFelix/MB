import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpService } from 'src/app/modules/shared/services/http.service';
@Component({
  selector: 'app-withdrawals-by-method-type',
  templateUrl: './withdrawals-by-method-type.component.html',
  styleUrls: ['./withdrawals-by-method-type.component.scss']
})
export class WithdrawalsByMethodTypeComponent implements OnInit {
  loaded = false;
  maleCount = 0;
  femaleCount = 0;
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options; // required
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { }; // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngularFlag: boolean = false; // optional boolean, defaults to false
  constructor(public _httpService: HttpService) { }

  ngOnInit() {

   this.plotGraph();
  }
 

  public plotGraph(): void {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45
        }
      },
      title: {
        text: 'Withdrawal transactions by type(Bank , Wallet , MoMo)'
      },
      tooltip: {
        // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        pointFormat: '{series.name}: <br>{point.percentage:.1f} %<br>Total: {point.y}'
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          stacking: 'normal',
          dataLabels: {
            format: '{point.name} <br>{point.percentage:.1f} %',
            enabled: true,
            y: 2,
            verticalAlign: 'top',
            align: 'left',
            color: '#000000',
            style: {
            }
          }
        }
      },
      series: [{
        name: 'Withdrawal Type',
        data: [
          {
            name: 'To Bank Account',
            y: 300
          }, {
            name: 'Mobile Money',
            y: 700
          },
          {
            name: 'Wallet',
            y: 1200
          }
        ],
        type: 'pie'
      }]
    };
  }
}

