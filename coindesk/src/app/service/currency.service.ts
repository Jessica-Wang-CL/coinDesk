import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from '../model/currency.interface';
import { TransformedCurrency } from './exchange-rate.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'http://localhost:8080/api/currency';

  constructor(private http: HttpClient) {}

  getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiUrl);
  }

  createOrUpdate(currency: TransformedCurrency): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/createOrUpdate`, currency);
  }

  deleteCurrency(code: string): Observable<void> {
    const params = new HttpParams().set('code', code);
    return this.http.post<void>(`${this.apiUrl}/delete`, null, { params });
  }
}
