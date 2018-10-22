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
import {from} from 'rxjs';
import {CategoryWithCount} from '../../../services/category';
import {CategoryService} from '../../../services/category.service';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;
  let service: CategoryService;

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
    service = TestBed.get(CategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize categories', function () {
    const spy = spyOn(service, 'getCategories').and.callFake(() => {
      return from([expectedCategories]);
    });
    fixture.componentInstance.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.categories).toEqual(expectedCategories.categories);
    expect(component.categories.length).toBe(2);
    expect(component.categoriesFetched).toBeTruthy();
  });

  it('should return categories with count', () => {
    const spy = spyOn(service, 'getCategories').and.callFake(() => {
      return from([expectedCategories]);
    });
    fixture.componentInstance.fetchCategories();
    expect(spy).toHaveBeenCalled();
    expect(component.categories).toEqual(expectedCategories.categories);
    expect(component.categories.length).toBe(2);
    expect(component.categoriesFetched).toBeTruthy();
  });

  it('should delete category', () => {
    const deletedCategoryId = 2;
    const returnMessage = 'Product successfully deleted';

    const spy = spyOn(service, 'deleteCategories').and.callFake(() => {
      return from([returnMessage]);
    });
    fixture.componentInstance.deleteCategory(deletedCategoryId);
    expect(spy).toHaveBeenCalled();
  });

  it('should select a product for update', () => {
    const updateCategory = {
      id: 2,
      name: 'category 1',
      product_count: 6,
      created_at: '2018-10-14T20:03:03.959263402+03:00',
      updated_at: '2018-10-08T09:30:19+03:00'
    };

    fixture.componentInstance.editCategory(updateCategory);
    expect(component.selectedCategory).toBe(updateCategory);
    expect(component.editingCategory).toBeTruthy();
  });

  it('should search categories', function () {

    const spy = spyOn(service, 'getCategories').and.callFake(() => {
      return from([expectedCategories]);
    });
    fixture.componentInstance.searchCategory('searchPhrase');
    expect(spy).toHaveBeenCalled();
    expect(component.categories).toEqual(expectedCategories.categories);
    expect(component.categories.length).toBe(2);
    expect(component.categoriesFetched).toBeTruthy();
  });

  it('should show category details', () => {
    const detailsCategory = {
      id: 2,
      name: 'category 1',
      product_count: 6,
      created_at: '2018-10-14T20:03:03.959263402+03:00',
      updated_at: '2018-10-08T09:30:19+03:00'
    };

    fixture.componentInstance.showDetails(detailsCategory);
    expect(component.showingCategoryDetails).toBeTruthy();
    expect(component.selectedCategory).toBe(detailsCategory);
  });

  it('should paginate categories', function () {
    const paginationInfo = {
      length: 20,
      pageIndex: 1,
      pageSize: 20,
      previousPageIndex: 1
    };

    const spy = spyOn(service, 'getCategories').and.callFake(() => {
      return from([expectedCategories]);
    });
    fixture.componentInstance.paginateCategories(paginationInfo);
    expect(spy).toHaveBeenCalled();
    expect(component.categories).toEqual(expectedCategories.categories);
    expect(component.categories.length).toBe(2);
    expect(component.categoriesFetched).toBeTruthy();
  });

  it('should sort categories', function () {
    const sortInfo = {
      active: 'name',
      direction: 'asc'
    };

    const spy = spyOn(service, 'getCategories').and.callFake(() => {
      return from([expectedCategories]);
    });
    fixture.componentInstance.sortCategories(sortInfo);
    expect(spy).toHaveBeenCalled();
    expect(component.categories).toEqual(expectedCategories.categories);
    expect(component.categories.length).toBe(2);
    expect(component.categoriesFetched).toBeTruthy();
  });

  it('should return a random color', function () {
    const color = component.getRandomColor();
    expect(color).toContain('#');
    expect(color.length).toBe(7);
  });

  it('should should update showingCategoryDetails when event emitted', function () {
    component.doneViewingDetails();
    expect(component.showingCategoryDetails).toBeFalsy();
  });
});
