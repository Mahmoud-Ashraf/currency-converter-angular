import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conversion } from 'src/app/models/conversion';
import { ConvertionService } from 'src/app/services/convertion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  conversionObj!: Conversion;
  constructor(
    private router: Router,
    private conversionService: ConvertionService,
  ) { }

  ngOnInit(): void {
    this.getConversionObj();
  }

  navigate(from: string, to: string) {
    this.router.navigate([`/details`], { queryParams: { from: from, to: to, amount: this.conversionObj.amount } });
  }

  getConversionObj() {
    this.conversionService.getConversionObjListener().subscribe(conversionObj => {
      this.conversionObj = conversionObj;
    });
  }

}
