import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() public searchEvent = new EventEmitter();
  @Input() public placeHolder;
  public search = '';

  constructor() {
  }

  emitSearchEvent() {
    this.searchEvent.emit(this.search);
  }

  ngOnInit() {
  }
}
