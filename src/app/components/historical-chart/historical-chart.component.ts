import { RequestsService } from './../../services/requests.service';
import { ConvertionService } from './../../services/convertion.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartConfiguration,
  ChartType
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Conversion } from 'src/app/models/conversion';

// import Annotation from 'chartjs-plugin-annotation';
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );
@Component({
  selector: 'app-historical-chart',
  templateUrl: './historical-chart.component.html',
  styleUrls: ['./historical-chart.component.scss']
})
export class HistoricalChartComponent implements OnInit {
  constructor(
    private convertionService: ConvertionService,
    private requestsService: RequestsService
  ) { }

  conversionObj!: Conversion;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'Septemper', 'October', 'November', 'December'];
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  chartData: any[] = [];
  labels = [...this.months.filter((_, i) => i >= this.currentMonth), ...this.months.filter((_, i) => i < this.currentMonth)]
  data!: ChartConfiguration['data'];

  chartOptions!: ChartConfiguration['options'];

  public chartType: ChartType = 'line';
  error: string = '';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnInit(): void {
    this.getConversionObj();
  }

  renderChart() {
    // work around because fixer.io historical API needs supscription.
    // i Used historical API with some work around to get the rate of last day of each month for the last year.
    for (let index = 1; index <= 12; index++) {
      // loop through months to get last day in each month and generate the accurate date to get the data.
      const month = (index < 10) ? ('0' + index) : index;
      const year = Number(index) > this.currentMonth ? this.currentYear - 1 : this.currentYear;
      const lastDayOfMonth = new Date(this.currentYear - 1, index, 0).getDate();
      this.getChartData(`${year}-${month}-${lastDayOfMonth}`);
    }
  }

  getChartData(date: string) {
    this.requestsService.get(`${date}?&base=${this.conversionObj.from}&symbols=${this.conversionObj.to}`).subscribe(data => {
      if (data.success) {
        this.chartData = [...this.chartData, data];
        if (this.chartData.length === 12) {
          this.error = '';
          this.data =
          {
            labels: this.labels,
            datasets: [
              {
                label: 'Rate',
                data: this.chartData.sort((a, b) => a.timestamp - b.timestamp).map(item => item.rates[this.conversionObj.to]),
                borderColor: '#FFD700',
                backgroundColor: '#FFD70066',
              }
            ],
          }
        }
      } else {
        this.error = data.error.type;
      }
    });
  }

  getConversionObj() {
    this.convertionService.getConversionObjListener().subscribe(conversionObj => {
      this.conversionObj = conversionObj;
      this.chartOptions = {
        responsive: true,
        aspectRatio: 4,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: `From ${this.conversionObj.from} To ${this.conversionObj.to} Through Last Year`,
          },
        },
      };
      this.chartData = [];
      this.renderChart();
    });
  }

}
