import {Component, OnInit} from '@angular/core';
import {Product, ProductWithCount} from '../../../services/product';
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
  displayedColumns: string[] = ['name', 'category', 'created_at', 'edit', 'delete'];
  public products: Product[];
  public selectedProduct;

  productsCount = 100;
  pageSize = 10;
  page = 0;
  sort = 'name';
  sort_dir = 'desc';

  constructor(private productService: ProductService, public snackBar: MatSnackBar) {
  }

  sortProducts(event) {
    console.log(event);
    if (event.direction !== '') {
      this.sort = event.active;
      this.sort_dir = event.direction;
      this.fetchProducts();
    }
  }

  paginate(event) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.productsFetched = false;
    this.fetchProducts();
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

  fetchProducts() {
    const queryParams = {
      params: {
        sort_dir: this.sort_dir,
        sort: this.sort,
        count: this.pageSize,
        offset: (this.page * this.pageSize),
      }
    };
    this.productService.getProducts(queryParams).subscribe(
      data => {
        this.productsFetched = true;
        this.products = data.products;
        this.productsCount = data.products_count;
      },
      error => {
        this.productsFetched = true;
        this.snackBar.open(error, '', {
          duration: 3000
        });
      });
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
    this.fetchProducts();
  }

}
