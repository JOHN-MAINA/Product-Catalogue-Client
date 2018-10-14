import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Category, CategoryWithCount} from './category';
import {globals} from '../config/env';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getFullPath(endpoint) {
    return globals.SERVER_URL + endpoint;
  }

  getCategories(params): Observable<CategoryWithCount> {
    // @ts-ignore
    return this.http.get<CategoryWithCount>(this.getFullPath('categories'), params)
      .pipe(
        catchError(this.handleError)
      );
  }

  createCategory(data): Observable<Category> {
    return this.http.post<Category>(this.getFullPath('categories'), data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCategory(data, id): Observable<Category> {
    return this.http.put<Category>(this.getFullPath('categories/' + id), data)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCategories(id): Observable<string> {
    return this.http.delete<string>(this.getFullPath('categories/' + id))
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
