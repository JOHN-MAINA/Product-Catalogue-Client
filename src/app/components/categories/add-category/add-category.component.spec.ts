import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddCategoryComponent} from './add-category.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Product} from '../../../services/product';
import {from} from 'rxjs';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../../services/category';

describe('AddCategoryComponent', () => {
  let component: AddCategoryComponent;
  let fixture: ComponentFixture<AddCategoryComponent>;
  let service: CategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCategoryComponent],
      imports: [
        FormsModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a category', () => {
    const createdCategory: Category = {
      id: 1,
      name: 'Test Category',
      product_count: 2,
      created_at: '2018-10-14T20:03:03.959263402+03:00',
      updated_at: '2018-10-08T09:30:19+03:00'
    };

    const spy = spyOn(service, 'createCategory').and.callFake(() => {
      return from([createdCategory]);
    });

    component.createCategory();
    expect(component.categoriesFetched).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });
});
