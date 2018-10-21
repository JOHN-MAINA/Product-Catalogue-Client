import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {PaginatorComponent} from './paginator.component';
import {MaterialModule} from '../../../material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
      imports: [MaterialModule, BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise paginateEventData', () => {
    const pageEventData = {
      length: 20,
      pageIndex: 1,
      pageSize: 20,
      previousPageIndex: 1
    };
    component.paginate(pageEventData);
    component.paginateEvent.subscribe(paginationData => {
      expect(paginationData).toEqual(pageEventData);
    });
  });
});
