import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductDetailsComponent} from './product-details.component';
import {MaterialModule} from '../../../material';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      imports: [MaterialModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 1,
      name: 'product',
      category: {
        id: 1,
        name: 'category 1',
        product_count: 6,
        created_at: '2018-10-14T20:03:03.959263402+03:00',
        updated_at: '2018-10-08T09:30:19+03:00'
      },
      created_at: '2018-10-14T20:03:03.959263402+03:00',
      category_id: 1,
      updated_at: '2018-10-08T09:30:19+03:00'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
