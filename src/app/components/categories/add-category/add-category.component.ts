import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../../services/category';
import {MatSnackBar} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  public categoriesFetched = false;
  public categories: Category[] = [];
  public categoryName = '';

  constructor(private categoryService: CategoryService, public snackBar: MatSnackBar) {
  }

  createCategory() {
    const category = {
      name: this.categoryName
    };

    this.categoryService.createCategory(category).subscribe(
      data => {
        this.categoriesFetched = true;
        this.categoryName = '';
        this.snackBar.open('Category Added successfully', '', {
          duration: 3000,
          verticalPosition: 'top'
        });
      },
      error => {
        this.categoriesFetched = true;
        this.snackBar.open(error, '', {
          duration: 3000
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
          duration: 3000
        });
      });
  }

}
