import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchComponent} from './search.component';
import {MaterialModule} from '../../../material';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [MaterialModule, FormsModule, BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    searchEl = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise searchEvent when clicked', () => {
    const expectedPhrase = 'Search Phrase';
    component.search = expectedPhrase;
    component.emitSearchEvent();
    component.searchEvent.subscribe(searchPhrase => {
      expect(expectedPhrase).toEqual(searchPhrase);
    });
  });

  it('submit button should initially be disabled', () => {
    component.search = '';
    fixture.detectChanges();
    expect(searchEl.nativeElement.disabled).toBeTruthy();
  });

});
