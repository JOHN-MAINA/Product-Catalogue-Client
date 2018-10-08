import {Component, OnInit} from '@angular/core';
import {Product} from '../../../services/product';
import {MatSnackBar} from '@angular/material';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  public productsFetched = false;
  public editingProduct = false;
  public countPerPage = 10;
  public page = 1;
  displayedColumns: string[] = ['name', 'category', 'created_at', 'edit', 'delete'];
  public products: Product[] = [];
  public selectedProduct;

  constructor(private productService: ProductService, public snackBar: MatSnackBar) {
  }

  productUpdated(product) {
    this.products = this.products.filter(function (value) {
      if (value.id === product.id) {
        value = product;
      }
      return value;
    });

    this.editingProduct = false;
  }

  editProduct(product) {
    this.selectedProduct = product;
    this.editingProduct = true;
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(
      data => {
        this.products = this.products.filter(function (value) {
          return value.id !== id;
        });
      },
      error => {
        this.snackBar.open(error, '', {
          duration: 3000
        });
      });
  }

  ngOnInit() {
    const queryParams = {
      params: {
        sort_dir: 'desc',
        count: this.countPerPage,
        offset: this.page === 1 ? 0 : (this.page - 1) * this.countPerPage,
      }
    };
    this.productService.getProducts(queryParams).subscribe(
      data => {
        this.productsFetched = true;
        this.products = data;
      },
      error => {
        this.productsFetched = true;
        this.snackBar.open(error, '', {
          duration: 3000
        });
      }
    );
  }

}
