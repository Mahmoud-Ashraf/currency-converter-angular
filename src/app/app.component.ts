import { LookupService } from './services/lookup.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'currency-converter-angular';
  constructor(private lookupService: LookupService) {

  }
  ngOnInit() {
    this.lookupService.fetchSymbols();
  }
}
