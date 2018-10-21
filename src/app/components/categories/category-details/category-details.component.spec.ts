import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoryDetailsComponent} from './category-details.component';
import {MaterialModule} from '../../../material';
import {FormsModule} from '@angular/forms';
import {ProductsListComponent} from '../../products/products-list/products-list.component';
import {EditProductComponent} from '../../products/edit-product/edit-product.component';
import {PaginatorComponent} from '../../templates/paginator/paginator.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ProductDetailsComponent} from '../../products/product-details/product-details.component';
import {SearchComponent} from '../../templates/search/search.component';

describe('CategoryDetailsComponent', () => {
  let component: CategoryDetailsComponent;
  let fixture: ComponentFixture<CategoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryDetailsComponent,
        ProductsListComponent,
        EditProductComponent,
        PaginatorComponent,
        ProductDetailsComponent,
        SearchComponent
      ],
      imports: [MaterialModule, FormsModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailsComponent);
    component = fixture.componentInstance;
    component.category = {
      id: 1,
      name: 'Test Category',
      product_count: 2,
      created_at: '2018-10-14T20:03:03.959263402+03:00',
      updated_at: '2018-10-08T09:30:19+03:00'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
