import { Injectable } from '@angular/core';

import { Product } from '../../shared/product';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../../shared/baseURL';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + 'products')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(baseURL + 'products/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedProduct(): Observable<Product> {
    return this.http.get<Product[]>(baseURL + 'products?featured=true').pipe(map(products => products[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getProducts().pipe(map(products => products.map(product => product.id)))
      .pipe(catchError(error => error));
  }
}
