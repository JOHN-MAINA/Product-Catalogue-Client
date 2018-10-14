import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {MatSnackBar} from '@angular/material';
import {Category} from '../../../services/category';

// @ts-ignore
@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'product_count', 'created_at', 'edit', 'visibility', 'delete'];

  public categoriesFetched = false;
  public editingCategory = false;
  public showingCategoryDetails = false;
  public search = '';
  public categories: Category[] = [];
  public selectedCategory;
  placeholder = 'Search by category name';
  pageSize = 10;
  page = 0;
  sort = 'name';
  sort_dir = 'desc';
  public categoriesCount = 0;

  constructor(private categoryService: CategoryService, public snackBar: MatSnackBar) {
  }

  doneViewingDetails() {
    this.showingCategoryDetails = false;
  }

  paginateCategories(event) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.fetchCategories();
  }

  fetchCategories() {
    const queryParams = {
      params: {
        sort_dir: this.sort_dir,
        sort: this.sort,
        count: this.pageSize,
        offset: (this.page * this.pageSize),
        search: this.search
      }
    };
    this.categoryService.getCategories(queryParams).subscribe(
      data => {
        this.categoriesFetched = true;
        this.categoriesCount = data.category_count;
        this.categories = data.categories;
      },
      error => {
        this.categoriesFetched = true;
        this.snackBar.open(error, '', {
          duration: 3000
        });
      });
  }

  categoryUpdated(category) {
    this.categories = this.categories.filter(function (value) {
      if (value.id === category.id) {
        value = category;
      }
      return value;
    });

    this.editingCategory = false;
  }

  searchCategory(event) {
    this.search = event;
    this.fetchCategories();
  }

  showDetails(category) {
    this.selectedCategory = category;
    this.showingCategoryDetails = true;
  }

  deleteCategory(id) {
    this.categoryService.deleteCategories(id).subscribe(
      data => {
        this.categories = this.categories.filter(function (value, index, arr) {
          return value.id !== id;
        });
      },
      error => {
        this.snackBar.open(error, '', {
          duration: 3000
        });
      });
  }

  editCategory(product) {
    this.selectedCategory = product;
    this.editingCategory = true;
  }

  ngOnInit() {
    this.fetchCategories();
  }

}
