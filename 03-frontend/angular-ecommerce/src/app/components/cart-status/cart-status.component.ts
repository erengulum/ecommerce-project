import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice:number=0.00;
  totalQuantity:number=0;


  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.updateCartStatus(); //böylece bu sınıf olusturuldugunda direkt cagrilacak
  }



  updateCartStatus() { //subscribe events from Cart Service

    //subscribe to the cart totalPrice: when new events/data are received make the assignments below:
    this.cartService.totalPrice.subscribe( //servisteki  totalPrice datasını buradaki this.totalPrice'a bagladık
      data => this.totalPrice = data

    );
    //subscribe to the totalQuantity
    this.cartService.totalQuantity.subscribe( //servisteki totalQuantity datasını buradaki this.totalQuantity'e bagladık
    data => this.totalQuantity = data

  );
    
  }

}
