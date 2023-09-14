import { RequestsService } from './../../services/requests.service';
import { LookupService } from './../../services/lookup.service';
import { Conversion } from './../../models/conversion';
import { ConvertionService } from 'src/app/services/convertion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  symbols: string[][] = [['EUR', 'Euro'], ['USD', 'United States Dollar']];
  conversionObj: Conversion = { from: 'EUR', to: 'USD', amount: 1 };
  conversionData: Conversion = { from: this.conversionObj.from, fromName: 'Euro', to: this.conversionObj.to, amount: this.conversionObj.amount, rate: 0 };
  error: string = '';
  isDetailsPage: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private conversionService: ConvertionService,
    private lookupService: LookupService,
    private requestsService: RequestsService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event.url.includes('/details')) {
          this.isDetailsPage = true;
        } else {
          this.isDetailsPage = false;
        }
      }
    });
  }


  ngOnInit(): void {
    this.getSymbols();
    this.checkForQueryParams();
  }

  getSymbols() {
    this.lookupService.getSymbols().subscribe(symbols => this.symbols = symbols);
  }

  navigate() {
    this.router.navigate([`/details`], { queryParams: { from: this.conversionData.from, to: this.conversionData.to, amount: this.conversionData.amount } });
  }

  checkForQueryParams() {
    this.route.queryParams
      .subscribe(params => {
        this.conversionObj.from = params['from'] || this.conversionObj.from;
        this.conversionObj.to = params['to'] || this.conversionObj.to;
        this.conversionObj.amount = params['amount'] || this.conversionObj.amount;
        this.convert();
      });
  }

  reverseCurrency() {
    this.conversionObj = { ...this.conversionObj, from: this.conversionObj.to, to: this.conversionObj.from };
  }

  convert() {
    const fromName = this.symbols?.find(symbol => symbol[0] === this.conversionObj.from);
    this.conversionData.fromName = fromName ? fromName[1] : this.conversionData.fromName;
    this.conversionData = { ...this.conversionData, ...this.conversionObj };
    this.requestsService.get(`latest?base=${this.conversionObj.from}&symbols=${this.conversionObj.to}`).subscribe(data => {
      if (data.success) {
        this.error = '';
        this.conversionData.rate = data.rates[this.conversionObj.to];
      }
      else {
        this.conversionData.rate = 0;
        this.error = data.error.type;
      }
    });
    this.conversionService.setConversionData(this.conversionData);
  }

}
