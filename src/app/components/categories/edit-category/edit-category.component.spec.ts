import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditCategoryComponent} from './edit-category.component';
import {MaterialModule} from '../../../material';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {from} from 'rxjs';
import {CategoryService} from '../../../services/category.service';

describe('EditCategoryComponent', () => {
  let component: EditCategoryComponent;
  let fixture: ComponentFixture<EditCategoryComponent>;
  let service: CategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditCategoryComponent],
      imports: [MaterialModule, FormsModule, HttpClientTestingModule, BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CategoryService);
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

  xit('should update category', (done: DoneFn) => {

    const spy = spyOn(service, 'updateCategory').and.callFake(() => {
      return from([component.category]);
    });

    component.updateCategory();
    expect(spy).toHaveBeenCalled();
  });
});
