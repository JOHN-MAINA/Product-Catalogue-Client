import {Component, OnInit} from '@angular/core';
import {Category} from '../../../services/category';
import {Product} from '../../../services/product';
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

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

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    public snackBar: MatSnackBar,
    private router: Router) {
  }

  createProduct() {
    const category = {
      name: this.localProduct.name,
      category_id: this.localProduct.category_id
    };

    this.productService.createProduct(category).subscribe(
      data => {
        this.categoriesFetched = true;
        this.localProduct.name = '';
        this.snackBar.open('Product Added successfully', '', {
          duration: 5000,
          verticalPosition: 'top'
        });
        this.router.navigate(['/products']);
      },
      error => {
        this.categoriesFetched = true;
        this.snackBar.open(error, '', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
  }

  ngOnInit() {
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
