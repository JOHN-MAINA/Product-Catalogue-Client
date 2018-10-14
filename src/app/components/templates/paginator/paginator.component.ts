import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Output() public paginateEvent = new EventEmitter();
  @Input() public count;
  public pageSize = 10;

  constructor() {
  }

  paginate(event) {
    this.paginateEvent.emit(event);
  }

  ngOnInit() {

  }

}
