import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoriesListComponent} from './components/categories/categories-list/categories-list.component';
import {CategoryDetailsComponent} from './components/categories/category-details/category-details.component';
import {AddCategoryComponent} from './components/categories/add-category/add-category.component';
import {AddProductComponent} from './components/products/add-product/add-product.component';
import {ProductDetailsComponent} from './components/products/product-details/product-details.component';
import {ProductsListComponent} from './components/products/products-list/products-list.component';

const routes: Routes = [
  {path: 'products', component: ProductsListComponent},
  {path: 'products/add', component: AddProductComponent},
  {path: 'products/id', component: ProductDetailsComponent},
  {path: 'categories', component: CategoriesListComponent},
  {path: 'categories/add', component: AddProductComponent},
  {path: 'categories/id', component: ProductsListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}

export const routingComponents = [
  CategoriesListComponent,
  CategoryDetailsComponent,
  AddCategoryComponent,
  AddProductComponent,
  ProductDetailsComponent,
  ProductsListComponent
];

