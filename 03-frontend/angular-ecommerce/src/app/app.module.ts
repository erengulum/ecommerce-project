import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import {HttpClientModule} from "@angular/common/http";

import {ProductService} from "./services/product.service";

import {Routes,RouterModule} from "@angular/router";
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

//Burada routesleri tanimlayacagiz.Yani hangi istekte ne yapsin seklinde bir yönlendirme olacak.Yani linkteki path'i match edecek
//ardından bu esleme dogruysa, yanında yazan componentten bir instance olusturup gerekli islemleri bu component üzerinden yapacak
const routes: Routes = [
{path:"cart-details",component:CartDetailsComponent},
{path:"products/:id",component:ProductDetailsComponent},
{path:"search/:keyword",component:ProductListComponent},
// bastaki "/" isareti koyulmaz.Typescript otomatik koyacak onu yani /category degil "category seklinde yaz"
{path:"category/:id",component:ProductListComponent},
{path:"category", component:ProductListComponent},
{path:"products",component:ProductListComponent},
{path:"", redirectTo:"/products",pathMatch:"full"}, //redirect olanlarda basa "/" koyulur
{path:"**",redirectTo:"/products",pathMatch:"full"}, //diger bütün talepler icin /products'a yönlendir demektir (generic wildcard)

//bu liste yukarıdan assagı okunur bu yüzden en yukarıda spesifik talepler, en assagıda ise genel talepler yer alır

];


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes), //yukarıda tanımladıgımız routers'ı burada import edeceksin !!!!
    BrowserModule,
    HttpClientModule,
    NgbModule//burası da sonradan eklendi
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
