import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productURL = 'http://localhost:3000/api/products';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productURL);
  }

  public detail(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.productURL}/${id}`);
  }

  public save(product: Product): Observable<any> {
    return this.httpClient.post<any>(this.productURL, product);
  }

  public update(id: number, product: Product): Observable<any> {
    return this.httpClient.put<any>(`${this.productURL}/${id}`, product);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.productURL}/${id}`);
  }
}
