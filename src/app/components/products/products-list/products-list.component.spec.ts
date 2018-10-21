import {async, ComponentFixture, TestBed} from '@angular/core/testing';
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

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let service: ProductService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductsListComponent,
        EditProductComponent,
        PaginatorComponent,
        SearchComponent,
        ProductDetailsComponent
      ],
      imports: [MaterialModule, HttpClientTestingModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.get(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should return products with count', function () {
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
    spyOn(service, 'getProducts').and.callFake(() => {
      return dummyProducts;
    });

    component.fetchProducts();
    expect(component.products).toEqual(dummyProducts.products);
  });

});
