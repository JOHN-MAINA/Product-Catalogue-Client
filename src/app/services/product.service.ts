import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {globals} from '../config/env';
import {Observable, throwError} from 'rxjs';
import {Product} from './product';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getFullPath(endpoint) {
    return globals.SERVER_URL + endpoint;
  }

  getProducts(params): Observable<Product[]> {
    return this.http.get<Product[]>(this.getFullPath('products'))
      .pipe(
        catchError(this.handleError)
      );
  }

  createProduct(data): Observable<Product> {
    return this.http.post<Product>(this.getFullPath('products'), data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(data, id): Observable<Product> {
    return this.http.put<Product>(this.getFullPath('products/' + id), data)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProduct(id): Observable<string> {
    return this.http.delete<string>(this.getFullPath('products/' + id))
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      `Something bad happened; please try again later`);
  }
}
