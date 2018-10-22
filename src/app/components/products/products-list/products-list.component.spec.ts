import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {ProductsListComponent} from './products-list.component';
import {ProductService} from '../../../services/product.service';
import {ProductWithCount} from '../../../services/product';
import {MaterialModule} from '../../../material';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EditProductComponent} from '../edit-product/edit-product.component';
import {PaginatorComponent} from '../../templates/paginator/paginator.component';
import {SearchComponent} from '../../templates/search/search.component';
import {ProductDetailsComponent} from '../product-details/product-details.component';
import {from, Observable} from 'rxjs';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let service: ProductService;

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
        category_id: 1,
        created_at: 'some date',
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductsListComponent,
        EditProductComponent,
        PaginatorComponent,
        SearchComponent,
        ProductDetailsComponent
      ],
      imports: [MaterialModule, HttpClientTestingModule, FormsModule],
      providers: [ProductService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return products with count', () => {
    const spy = spyOn(service, 'getProducts').and.callFake(() => {
      return from([dummyProducts]);
    });
    fixture.componentInstance.fetchProducts();
    expect(spy).toHaveBeenCalled();
    expect(component.products).toEqual(dummyProducts.products);
    expect(component.products.length).toBe(2);
    expect(component.productsFetched).toBeTruthy();
  });

  it('should delete product', () => {
    const deletedProductId = 2;
    const returnMessage = 'Product successfully deleted';

    const spy = spyOn(service, 'deleteProduct').and.callFake(() => {
      return from([returnMessage]);
    });
    fixture.componentInstance.deleteProduct(deletedProductId);
    expect(spy).toHaveBeenCalled();
  });

  it('should select a product for update', () => {
    const updateProduct = {
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
    };

    fixture.componentInstance.editProduct(updateProduct);
    expect(component.selectedProduct).toBe(updateProduct);
    expect(component.editingProduct).toBeTruthy();
  });

  it('should show product details', () => {
    const detailsProduct = {
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
    };

    fixture.componentInstance.showDetails(detailsProduct);
    expect(component.viewingProductDetails).toBeTruthy();
    expect(component.selectedProduct).toBe(detailsProduct);
  });

  it('should paginate products', function () {
    const paginationInfo = {
      length: 20,
      pageIndex: 1,
      pageSize: 20,
      previousPageIndex: 1
    };

    const spy = spyOn(service, 'getProducts').and.callFake(() => {
      return from([dummyProducts]);
    });
    fixture.componentInstance.paginate(paginationInfo);
    expect(spy).toHaveBeenCalled();
    expect(component.products).toEqual(dummyProducts.products);
    expect(component.products.length).toBe(2);
    expect(component.productsFetched).toBeTruthy();
  });

  it('should sort products', function () {
    const sortInfo = {
      active: 'name',
      direction: 'asc'
    };

    const spy = spyOn(service, 'getProducts').and.callFake(() => {
      return from([dummyProducts]);
    });
    fixture.componentInstance.sortProducts(sortInfo);
    expect(spy).toHaveBeenCalled();
    expect(component.products).toEqual(dummyProducts.products);
    expect(component.products.length).toBe(2);
    expect(component.productsFetched).toBeTruthy();
  });
});
