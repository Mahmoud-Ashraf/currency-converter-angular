import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  baseUrl = environment.baseApi;
  apiKey = environment.APIKey;
  constructor(private http: HttpClient) { }

  get(apiUrl: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.getApiKey(apiUrl)}`);
  }

  post(apiUrl: string, data?: any) {
    return this.http.post(`${this.baseUrl}${this.getApiKey(apiUrl)}`, data);
  }
  put(apiUrl: string, data?: any) {
    ;
    return this.http.put(`${this.baseUrl}${this.getApiKey(apiUrl)}`, data);
  }

  delete(apiUrl: any) {
    return this.http.delete(`${this.baseUrl}${this.getApiKey(apiUrl)}`);
  }

  getApiKey(apiUrl: string) {
    let apiKeyParam = `?access_key=${this.apiKey}`;
    if (apiUrl.includes('?')) {
      apiKeyParam = `&access_key=${this.apiKey}`;
    }
    return apiUrl + apiKeyParam;
  }
}
