import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss']
})
export class HomeCardsComponent implements OnInit {

  toCurrencies: string[] = ['EGP', 'AED', 'SAR', 'USD', 'QAR', 'INR', 'JPY', 'KWD', 'CNY'];
  constructor() { }

  ngOnInit(): void {
  }

}
