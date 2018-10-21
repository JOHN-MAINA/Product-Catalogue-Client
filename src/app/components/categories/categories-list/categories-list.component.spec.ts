import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoriesListComponent} from './categories-list.component';
import {CategoryDetailsComponent} from '../category-details/category-details.component';
import {PaginatorComponent} from '../../templates/paginator/paginator.component';
import {SearchComponent} from '../../templates/search/search.component';
import {EditCategoryComponent} from '../edit-category/edit-category.component';
import {MaterialModule} from '../../../material';
import {ProductsListComponent} from '../../products/products-list/products-list.component';
import {FormsModule} from '@angular/forms';
import {ProductDetailsComponent} from '../../products/product-details/product-details.component';
import {EditProductComponent} from '../../products/edit-product/edit-product.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoriesListComponent,
        CategoryDetailsComponent,
        PaginatorComponent,
        SearchComponent,
        EditCategoryComponent,
        ProductsListComponent,
        ProductDetailsComponent,
        EditProductComponent
      ],
      imports: [
        MaterialModule,
        FormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
