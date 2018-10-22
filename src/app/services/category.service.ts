import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
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
    return this.http.get<CategoryWithCount>(this.getFullPath('categories'), params);
  }

  createCategory(data): Observable<Category> {
    return this.http.post<Category>(this.getFullPath('categories'), data);
  }

  updateCategory(data, id): Observable<Category> {
    return this.http.put<Category>(this.getFullPath('categories/' + id), data);
  }

  deleteCategories(id): Observable<string> {
    return this.http.delete<string>(this.getFullPath('categories/' + id));
  }
}
