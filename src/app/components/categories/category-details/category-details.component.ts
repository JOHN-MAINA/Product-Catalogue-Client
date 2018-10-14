import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  @Input() public category;
  @Output() public doneViewingDetailsEvent = new EventEmitter();

  constructor(private productService: ProductService) {
  }

  headBack() {
    this.doneViewingDetailsEvent.emit();
  }
  ngOnInit() {

  }

}
