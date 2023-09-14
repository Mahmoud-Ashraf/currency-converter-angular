import { Injectable } from '@angular/core';
import { RequestsService } from './requests.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  symbols = new Subject<string[][]>();
  constructor(private requestsService: RequestsService) { }

  fetchSymbols() {
    this.requestsService.get('symbols').subscribe((data) => this.symbols.next(Object.entries(data.symbols)));
  }

  getSymbols() {
    return this.symbols.asObservable();
  }

}
