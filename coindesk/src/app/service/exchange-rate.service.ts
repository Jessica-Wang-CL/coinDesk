import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TransformedCurrency {
  currency: string;
  chineseName: string;
  rate: number;
}

export interface TransformedResponse {
  updatedTime: string;
  disclaimer: string;
  currencyList: TransformedCurrency[];
}

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiUrl = 'http://localhost:8080/api/coindesk/transformed';

  constructor(private http: HttpClient) {}

  getTransformedRates(): Observable<TransformedResponse> {
    return this.http.get<TransformedResponse>(this.apiUrl);
  }
}
