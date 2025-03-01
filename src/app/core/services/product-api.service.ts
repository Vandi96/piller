import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductResponse } from '@core/interface/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private readonly _baseUrl = 'https://dummyjson.com/';
  private _http = inject(HttpClient);

  public getProducts$(
    search: string = '',
    limit: number = 10,
    skip: number = 0,
    sortBy: string = 'title',
    order: string = 'asc'
  ): Observable<ProductResponse> {
    let url = this._baseUrl + 'products';
    let params = new HttpParams()
      .set('limit', limit)
      .set('skip', skip)
      .set('sortBy', sortBy)
      .set('order', order);

    // Ha van keresési kulcsszó, akkor a keresési végpontot használjuk
    if (search.trim().length > 0) {
      url += `/search?q=${search}`;
    }

    return this._http.get<ProductResponse>(url, { params });
  }
}
