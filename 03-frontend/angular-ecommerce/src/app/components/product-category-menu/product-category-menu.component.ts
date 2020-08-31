import { Component, OnInit } from '@angular/core';
import {ProductCategory} from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {


  productCategories:ProductCategory[];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.listProductCategories(); //component kurulur kurulmaz bu metodu calistir
  }



  listProductCategories() {
    this.productService.getProductCategories().subscribe( //servis katmanından veri bu sekilde cekiliyor
      data=>{
        this.productCategories = data; //önemli olan kısım burası, servis aracılığıyla gelen veriyi productCategories arrayine attik
      }
      
    );
  }

}
