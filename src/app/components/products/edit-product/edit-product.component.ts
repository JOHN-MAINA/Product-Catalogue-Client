import {Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, NgModule, OnInit, Output} from '@angular/core';
import {Product} from '../../../services/product';
import {MatSnackBar} from '@angular/material';
import {ProductService} from '../../../services/product.service';
import {Category} from '../../../services/category';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @Input() public product;
  @Output() public productEvent = new EventEmitter();

  public categoriesFetched = false;
  public updatingProduct = false;

  public categories: Category[] = [];

  public localProduct: Product = {
    id: 0,
    name: '',
    category: {
      id: 0,
      name: '',
      created_at: '',
      updated_at: '',
      product_count: 0
    },
    created_at: '',
    updated_at: '',
    category_id: 0
  };

  constructor(private productService: ProductService, private categoryService: CategoryService, public snackBar: MatSnackBar) {
  }

  updateProduct() {
    const category = {
      name: this.localProduct.name,
      category_id: this.localProduct.category_id
    };

    this.productService.updateProduct(category, this.localProduct.id).subscribe(
      data => {
        this.snackBar.open('Product Updated successfully', '', {
          duration: 5000,
          verticalPosition: 'top'
        });

        this.productEvent.emit(data);
      },
      error => {
        this.snackBar.open(error, '', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
  }

  ngOnInit() {
    if (this.product.name) {
      this.localProduct = this.product;
    }

    this.categoryService.getCategories({}).subscribe(
      data => {
        this.categoriesFetched = true;
        this.categories = data.categories;
      },
      error => {
        this.categoriesFetched = true;
        this.snackBar.open(error, '', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
  }

}
