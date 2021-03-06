import {Component, Input, OnInit} from '@angular/core';
import {Product, ProductWithCount} from '../../../services/product';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProductService} from '../../../services/product.service';
import {DeleteDialogComponent} from '../../templates/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() categoryId = 0;
  searchInputPlaceholder = 'Search by product name Or category name';

  public productsFetched = false;
  public editingProduct = false;
  public viewingProductDetails = false;
  public products: Product[];
  public selectedProduct;

  constructor(private productService: ProductService, public snackBar: MatSnackBar, public dialog: MatDialog) {
  }
  displayedColumns: string[] = ['name', 'category', 'created_at', 'edit', 'visibility', 'delete'];
  productsCount = 100;
  pageSize = 10;
  page = 0;
  sort = 'name';
  sort_dir = 'desc';
  search = '';

  sortProducts(event) {
    if (event.direction !== '') {
      this.sort = event.active;
      this.sort_dir = event.direction;
      this.fetchProducts();
    }
  }

  searchProduct(searchPhrase) {
    this.search = searchPhrase;
    this.fetchProducts();
  }

  paginate(event) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.fetchProducts();
  }

  showDetails(product) {
    this.selectedProduct = product;
    this.viewingProductDetails = true;
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

  doneViewingDetails() {
    this.viewingProductDetails = false;
  }

  fetchProducts() {
    const queryParams = {
      params: {
        sort_dir: this.sort_dir,
        sort: this.sort,
        count: this.pageSize,
        offset: (this.page * this.pageSize),
        search: this.search,
        category_id: this.categoryId
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
          duration: 5000,
          verticalPosition: 'top'
        });
      });
  }

  editProduct(product) {
    this.selectedProduct = product;
    this.editingProduct = true;
  }

  deleteProduct(product) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {type: 'Product', name: product.name, confirmed: false}
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.productService.deleteProduct(product.id).subscribe(
          data => {
            this.products = this.products.filter(function (value) {
              return value.id !== product.id;
            });
          },
          error => {
            this.snackBar.open(error, '', {
              duration: 5000,
              verticalPosition: 'top'
            });
          });
      }
    });
  }

  ngOnInit() {
    this.fetchProducts();
  }

}
