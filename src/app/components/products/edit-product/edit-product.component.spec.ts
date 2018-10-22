import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {EditProductComponent} from './edit-product.component';
import {MaterialModule} from '../../../material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {from} from 'rxjs';
import {CategoryWithCount} from '../../../services/category';
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {Product} from '../../../services/product';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
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
      declarations: [EditProductComponent],
      imports: [MaterialModule, HttpClientTestingModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 1,
      name: 'product',
      category: {
        id: 1,
        name: 'category 1',
        product_count: 6,
        created_at: '2018-10-08T09:30:19+03:00',
        updated_at: '2018-10-14T20:03:03.959263402+03:00'
      },
      created_at: '2018-10-08T09:30:19+03:00',
      category_id: 1,
      updated_at: '2018-10-14T20:03:03.959263402+03:00'
    };

    service = TestBed.get(ProductService);
    categoryService = TestBed.get(CategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });

  it('should get categories onInit', () => {
    const spy = spyOn(categoryService, 'getCategories').and.callFake(() => {
      return from([expectedCategories]);
    });
    fixture.componentInstance.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.categories).toEqual(expectedCategories.categories);
    expect(component.categories.length).toBe(2);
    expect(component.categoriesFetched).toBeTruthy();
  });

  it('should update product', (done: DoneFn) => {

    const spy = spyOn(service, 'updateProduct').and.callFake(() => {
      return from([component.product]);
    });

    component.updateProduct();
    expect(spy).toHaveBeenCalled();
  });
});
