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

  public categoriesFetched = false;
  public editingCategory = false;
  displayedColumns: string[] = ['name', 'product_count', 'created_at', 'edit', 'delete'];
  public categories: Category[] = [];
  public selectedCategory;

  constructor(private categoryService: CategoryService, public snackBar: MatSnackBar) {
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
    this.categoryService.getCategories().subscribe(
      data => {
        this.categoriesFetched = true;
        this.categories = data;
      },
      error => {
        this.categoriesFetched = true;
        this.snackBar.open(error, '', {
          duration: 3000
        });
      });
  }

}
