import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddProductComponent} from './add-product.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
