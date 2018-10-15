import {Component, ElementRef, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {MatSnackBar} from '@angular/material';
import {Category} from '../../../services/category';
import {Chart} from 'chart.js';
import {element} from 'protractor';

// @ts-ignore
@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})

export class CategoriesListComponent implements OnInit {

  constructor(private categoryService: CategoryService, public snackBar: MatSnackBar) {
  }

  public displayedColumns: string[] = ['name', 'product_count', 'created_at', 'edit', 'visibility', 'delete'];

  public categoriesFetched = false;
  public editingCategory = false;
  public showingCategoryDetails = false;
  public search = '';
  public categories: Category[] = [];
  public selectedCategory;
  public piechart;
  placeholder = 'Search by category name';
  pageSize = 100;
  page = 0;
  sort = 'created_at';
  sort_dir = 'desc';
  public categoriesCount = 0;
  PieChart = [];
  LineChart = [];

  categoryData = [];
  bgColors = [];

  chartData = {
    labels: [],
    datasets: [{
      label: 'Number Of Products per category',
      data: this.categoryData,
      backgroundColor: this.bgColors,
    }]
  };


  doneViewingDetails() {
    this.showingCategoryDetails = false;
  }

  paginateCategories(event) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.fetchCategories();
  }

  sortCategories(event) {
    if (event.direction !== '') {
      this.sort = event.active;
      this.sort_dir = event.direction;
      this.fetchCategories();
    }
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
        data.categories.forEach(category => {
          this.chartData.labels.push(category.name);
          this.categoryData.push(category.product_count);
          this.bgColors.push(this.getRandomColor());
        });
        this.PieChart = new Chart('linechart', {
          type: 'pie',
          data: this.chartData
        });
      },
      error => {
        this.categoriesFetched = true;
        this.snackBar.open(error, '', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
        this.categories = this.categories.filter(function (value) {
          return value.id !== id;
        });
      },
      error => {
        this.snackBar.open(error, '', {
          duration: 5000,
          verticalPosition: 'top'
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
