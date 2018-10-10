import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() public product;
  @Output() public productEvent = new EventEmitter();
  constructor() {
  }

  headBack() {

  }

  ngOnInit() {
  }

}
