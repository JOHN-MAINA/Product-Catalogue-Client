import {TestBed} from '@angular/core/testing';

import {CategoryService} from './category.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CategoryWithCount} from './category';
import {globals} from '../config/env';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(CategoryService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get categories via GET', (done: DoneFn) => {
      const expectedCategories: CategoryWithCount = {
        category_count: 2,
        categories: [
          {
            id: 1,
            name: 'Category One',
            product_count: 2,
            created_at: '2018-10-14T20:03:03.959263402+03:00',
            updated_at: '2018-10-08T09:30:19+03:00'
          },
          {
            id: 2,
            name: 'Category Two',
            product_count: 2,
            created_at: '2018-10-14T20:03:03.959263402+03:00',
            updated_at: '2018-10-08T09:30:19+03:00'
          }
        ]
      };

      service.getCategories({}).subscribe(categories => {
        expect(categories.categories.length).toBe(2);
        expect(categories).toEqual(expectedCategories);
        done();
      });

    const req = httpMock.expectOne(service.getFullPath('categories'));
    expect(req.request.method).toBe('GET');
    req.flush(expectedCategories);
  });

  it('should update category', (done: DoneFn) => {
    const updatedCategory = {
      id: 2,
      name: 'Category Two',
      product_count: 2,
      created_at: '2018-10-14T20:03:03.959263402+03:00',
      updated_at: '2018-10-08T09:30:19+03:00'
    };

    service.updateCategory(updatedCategory, updatedCategory.id).subscribe(product => {
      expect(product).toEqual(updatedCategory);
      done();
    });

    const req = httpMock.expectOne(service.getFullPath('categories/' + updatedCategory.id));
    expect(req.request.method).toBe('PUT');
    req.flush(updatedCategory, { status: 200, statusText: 'Ok' });
  });

  it('should delete category', (done: DoneFn) => {
    const deleteCategoryId = 2;
    const returnMessage = 'Category Deleted';

    service.deleteCategories(deleteCategoryId).subscribe(product => {
      expect(product).toEqual(returnMessage);
      done();
    });

    const req = httpMock.expectOne(service.getFullPath('categories/' + deleteCategoryId));
    expect(req.request.method).toBe('DELETE');
    req.flush(returnMessage, { status: 204, statusText: 'Ok' });
  });

  it('should return correct full path', () => {
    const fullPath = globals.SERVER_URL + 'endpoint';

    const generatedFullPath = service.getFullPath('endpoint');

    expect(generatedFullPath).toBe(fullPath);
    expect(generatedFullPath).toContain('endpoint');
  });
});
