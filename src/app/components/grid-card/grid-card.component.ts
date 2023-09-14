import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Conversion } from 'src/app/models/conversion';
import { ConvertionService } from 'src/app/services/convertion.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.scss']
})
export class GridCardComponent implements OnInit, OnChanges {

  @Input() to!: string;
  conversionObj!: Conversion;
  rate: number = 0;
  error: string = '';
  constructor(
    private conversionService: ConvertionService,
    private requestsService: RequestsService
  ) { }

  ngOnInit(): void {
    this.getConversionObj();
    // this.convert();
  }

  getConversionObj() {
    this.conversionService.getConversionObjListener().subscribe(conversionObj => {
      this.conversionObj = conversionObj;
      this.convert();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['to'] && !changes['to'].isFirstChange()) {
      this.convert();
    }
  }

  convert() {
    this.requestsService.get(`latest?base=${this.conversionObj.from}&symbols=${this.to}`).subscribe(data => {
      if (data.success) {
        this.error = '';
        this.rate = data.rates[this.to];
      }
      else {
        this.rate = 0;
        this.error = data.error.type;
      }
    });
  }

}
