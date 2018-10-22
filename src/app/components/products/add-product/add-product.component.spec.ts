import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddProductComponent} from './add-product.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {from} from 'rxjs';
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {CategoryWithCount} from '../../../services/category';
import {Product} from '../../../services/product';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let service: ProductService;
  let categoryService: CategoryService;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [FormsModule, MaterialModule, HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ProductService);
    categoryService = TestBed.get(CategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get categories', () => {

    const spy = spyOn(categoryService, 'getCategories').and.callFake(() => {
      return from([expectedCategories]);
    });
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.categories).toEqual(expectedCategories.categories);
    expect(component.categoriesFetched).toBeTruthy();
  });

  it('should create a product', () => {
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

    const spy = spyOn(service, 'createProduct').and.callFake(() => {
      return from([createdProduct]);
    });

    component.createProduct();
    expect(component.categoriesFetched).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });
});
