import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpService } from 'src/app/modules/shared/services/http.service';

@Component({
  selector: 'app-validation-requests-by-mto',
  templateUrl: './validation-requests-by-mto.component.html',
  styleUrls: ['./validation-requests-by-mto.component.scss']
})
export class ValidationRequestsByMtoComponent implements OnInit {
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
        text: 'Withdrawal transactions by Money Transfer Company'
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
        name: 'MTO',
        data: [
          {
            name: 'RIA',
            y: 500
          }, {
            name: 'Unity Link',
            y: 700
          },
          {
            name: 'Small World',
            y: 1200
          }
        ],
        type: 'pie'
      }]
    };
  }
}

