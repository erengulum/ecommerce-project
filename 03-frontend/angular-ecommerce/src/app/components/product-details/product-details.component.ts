import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product=new Product();

  constructor(private productService:ProductService, //bu ikisini enjekte ediyoruz
          private route:ActivatedRoute,
          private cartService:CartService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(() =>{
      this.handleProductDetails(); //sınıf cagrıldıgında direkt bu metodu calistir
    }


    )

  }


  handleProductDetails() {
   
    //get the id param string from Router caller. And convert string id to number (basina "+"" koyarsan string number'a döner)
    const theProductId:number = +this.route.snapshot.paramMap.get("id");

    this.productService.getProduct(theProductId).subscribe(
      data=>{
        this.product = data;
      }
    )

  }



  addToCart(){

    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);

  }



}
