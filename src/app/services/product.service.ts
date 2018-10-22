import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {globals} from '../config/env';
import {Observable} from 'rxjs';
import {Product, ProductWithCount} from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getFullPath(endpoint) {
    return globals.SERVER_URL + endpoint;
  }

  getProducts(params): Observable<ProductWithCount> {
    // @ts-ignore
    return this.http.get<ProductWithCount>(this.getFullPath('products'), params);
  }

  createProduct(data): Observable<Product> {
    return this.http.post<Product>(this.getFullPath('products'), data);
  }

  updateProduct(data, id): Observable<Product> {
    return this.http.put<Product>(this.getFullPath('products/' + id), data);
  }

  deleteProduct(id): Observable<string> {
    return this.http.delete<string>(this.getFullPath('products/' + id));
  }
}
