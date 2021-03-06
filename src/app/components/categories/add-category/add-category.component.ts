import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  public categoriesFetched = false;
  public categoryName = '';

  constructor(private categoryService: CategoryService, public snackBar: MatSnackBar, private router: Router) {
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
          duration: 5000,
          verticalPosition: 'top'
        });
        this.router.navigate(['/categories']);
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
  }

}
