import { RequestsService } from './requests.service';
import { Injectable } from '@angular/core';
import { Conversion } from '../models/conversion';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvertionService {

  conversionObj: Conversion = { from: 'EUR', fromName: 'Euro', to: 'USD', amount: 1, rate: 0 };
  private conversionObjListner = new BehaviorSubject<Conversion>(this.conversionObj);
  constructor() { }

  resetRate() {
    this.conversionObj.rate = 0;
    this.setConversionData(this.conversionObj);
  }

  setConversionData(conversionObj: Conversion) {
    this.conversionObjListner.next(conversionObj);
    this.conversionObj = conversionObj;
  }

  getConversionObjListener() {
    return this.conversionObjListner.asObservable();
  }

  getConversionData() {
    return this.conversionObj;
  }

}
