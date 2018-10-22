import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MaterialModule} from './material';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {LayoutModule} from '@angular/cdk/layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {EditCategoryComponent} from './components/categories/edit-category/edit-category.component';
import {FormsModule} from '@angular/forms';
import {EditProductComponent} from './components/products/edit-product/edit-product.component';
import {PaginatorComponent} from './components/templates/paginator/paginator.component';
import {SearchComponent} from './components/templates/search/search.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ProductCatalogueIntercepter} from './services/product-catalogue-intercepter';
import {DeleteDialogComponent} from './components/templates/delete-dialog/delete-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    EditCategoryComponent,
    EditProductComponent,
    PaginatorComponent,
    SearchComponent,
    PageNotFoundComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [DeleteDialogComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProductCatalogueIntercepter,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
