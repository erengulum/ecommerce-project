import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from "../common/product";
import { map } from "rxjs/operators";
import { ProductCategory } from '../common/product-category';


//ng generate service services/product komutuyla olusturduk

//Servis enjekte edilebilir olmalı cünkü bu servisleri compponentlere injekte edip metodlarından yararlanacagiz.
@Injectable({
  providedIn: 'root'
})
export class ProductService {


  //Burada, backende baglanmak icin gereken Rest api service islerini yapacagiz
  //Buraya baglan:ng
  private baseUrl = "http://localhost:8080/api/products"; //size=100 tek seferde 100 tane istenen objeden cek demek default=20

  private categoryUrl = "http://localhost:8080/api/product-category"; //category'leri cekmek icin bu url'e request atılmalı

  //constructor'a dikkat!
  constructor(private httpClient: HttpClient) { }


  getProduct(theProductId: number): Observable<Product> {

    //need to build URL based on product id (yani id'ye göre product çekmek için gerekli url'yi kuruyoruz).Backendde request atmak icin 
    const productUrl = `${this.baseUrl}/${theProductId}`; //Spring'in direktbu endpoint için built-in metodu var (Spring Data içinde)


    //tek bir product dönecegi için embedded yapıp JSON'u product objesine çevirmene gerek yok. Tek obje isterken direkt alırsın onu
    return this.httpClient.get<Product>(productUrl);
  }



  private getProducts(searchUrl: string): Observable<Product[]> { //Url'i alıp veri cekiyor.Product 1'den çok olduğu için JSON arrayi geleecek
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products) //en alttaki interfacelere bak!!!
    );
  }



  //Servis'in ilk metodunu yazalım: Map the JSON data from Spring Data REST to our product array.
  //Yani spring'den gelen veriyi/productları (yukarıdaki base url'den) array olarak alacagiz
  public getProductList(theCategoryId: number): Observable<Product[]> {

    //need to build Url based on category id: category id'sine göre productlari cekmek icin url'yi bu sekle cevir:
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;


    return this.getProducts(searchUrl);
  }



  //category'e göre listeleme icin bu kullanılır
  public getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts> {

    //need to build Url based on category id, pageg and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);

  }


  //yukarıdaki method category id'lerine göre productları cekiyordu(ccategory_id=1 olan productları vs)
  //Bu metod ise direk category'leri cekiyor
  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe( //GetResponseProductCategory'ı asagida interface olarak tanimlamıştık
      map(response => response._embedded.productCategory)
    );
  }


  //keyword ile search işlemi 
  searchProducts(theKeyword: string): Observable<Product[]> {

    //need to build Url based on keyword: keyword ile eşleşen productlari backendden cekmek icin url'yi bu sekle cevir:
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`; //backende istek yapmak icin gerkeli url yani.


    return this.getProducts(searchUrl); //Refactoring yapıp buradaki veri baglama islemini bir fonksiyonla hallettik(asagıda)

  }


  //keyword'e göre arama/listeleme icin bu metod:
  public searchProductsPaginate(thePage: number, thePageSize: number, theKeyword: string): Observable<GetResponseProducts> {

    //need to build Url based on keyword, page and page size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);

  }














}


//bu interfaceleri yukarıda html requestleri atarken kullanıyoruz .get<GetResponseProduct> vs diye. COK ÖNEMLİ!!!!!
//Dönecegiz veri tipini embedded içerisinde belirlemeliyiz (Product[] veya ProductCategory[] gibi...)
//Bu intefaceler kısaca gelen JSON tipindeki verileri parse/unwrap edip objeye çevirmek için kullanılır bu yüzden çok önemliler!!!!
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
  page: { //Veri cekerken en alta bak orada page diye özel bir json verisi var.Sayfa ile ilgili bilgi veriyor
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

//bu interface'i de olustur mutlaka ama önemi ne ????
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}