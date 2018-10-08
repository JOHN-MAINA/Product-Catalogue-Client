import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  @Input() public category;
  public updatingCategory = false;
  public localCategory = {
    id: 0,
    name: ''
  };

  @Output() public categoryEvent = new EventEmitter();

  constructor(private categoryService: CategoryService, public snackBar: MatSnackBar) {
  }

  updateCategory() {
    const category = {
      name: this.localCategory.name
    };

    this.categoryService.updateCategory(category, this.localCategory.id).subscribe(
      data => {
        this.snackBar.open('Category Added successfully', '', {
          duration: 3000,
          verticalPosition: 'top'
        });

        this.categoryEvent.emit(data);
      },
      error => {
        this.snackBar.open(error, '', {
          duration: 3000
        });
      });
  }

  ngOnInit() {
    if (this.category.name) {
      this.localCategory = this.category;
    }
  }

}
