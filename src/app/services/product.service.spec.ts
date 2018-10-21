import {TestBed, inject } from '@angular/core/testing';

import {ProductService} from './product.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Product, ProductWithCount} from './product';
import {Category} from './category';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ProductService]
      });
        service = TestBed.get(ProductService);
        httpMock = TestBed.get(HttpTestingController);
    });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products from the api via GET', (done: DoneFn) => {
      const dummyProducts: ProductWithCount = {
        products: [
          {
            id: 1,
            name: 'product',
            category: {
              id: 1,
              name: 'category 1',
              product_count: 6,
              created_at: 'somecreated at',
              updated_at: 'updated_at'
            },
            created_at: 'some date',
            category_id: 1,
            updated_at: 'updated_at'
          },
          {
            id: 2,
            name: 'product 2',
            category: {
              id: 2,
              name: 'category 1',
              product_count: 6,
              created_at: 'somecreated at',
              updated_at: 'updated_at'
            },
            created_at: 'some date',
            category_id: 2,
            updated_at: 'updated_at'
          }
        ],
        products_count: 2
      };

      service.getProducts('products').subscribe(products => {
        expect(products.products.length).toBe(2);
        expect(products).toEqual(dummyProducts);
        done();
      });

    const req = httpMock.expectOne(service.getFullPath('products'));
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should create product', (done: DoneFn) => {
    const createdProduct: Product = {
      id: 2,
      name: 'product 2',
      category: {
        id: 2,
        name: 'Category Name',
        product_count: 2,
        created_at: '2018-10-14T20:03:03.959263402+03:00',
        updated_at: '2018-10-08T09:30:19+03:00'
      },
      category_id: 2,
      created_at: '2018-10-14T20:03:03.959263402+03:00',
      updated_at: '2018-10-08T09:30:19+03:00'
    };

    service.createProduct(createdProduct).subscribe(product => {
      expect(product).toEqual(createdProduct);
      done();
    });

    const req = httpMock.expectOne(service.getFullPath('products'));
    expect(req.request.method).toBe('POST');
    req.flush(createdProduct);
  });
});
