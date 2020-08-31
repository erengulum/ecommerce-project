import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  //cart Servisi, sepete atılan bütün itemleri listede tutuyor
  cartItems: CartItem[] = [];

  //Her ürün eklendiğinde totalPrice ve totalQuantity degisecegi icin global tanimladik
  totalPrice: Subject<number> = new Subject<number>(); //Subject is subclass of Observable (Bunları arastir.)
  totalQuantity: Subject<number> = new Subject<number>();


  constructor() { }



  addToCart(theCartItem: CartItem) {

    //check if we already have the item in our cart section
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {//yani cart kısmı boş değilse
      //find the item in the cart based on item id (Yani cart kısmımızda bu item zaten var mı diye kontrol et)
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }

      }

    //check if we found it in our cart section. If yes it will return true otherwise it is false
    alreadyExistsInCart = (existingCartItem != undefined); //yani bu item yukarıdaki loop içerisinde bulunduysa true olacak, bulunmamışsa false olacak burasi 

    }


    if (alreadyExistsInCart) {//zaten cart section'unda bu itemden varsa sadece sayısını +1 yap
      existingCartItem.quantity++;

    }
    else { //eger yoksa direk olarak bu item'ı listeye ekle
      //just add the  item to the array
      this.cartItems.push(theCartItem);
    }

    //compute the total price and total quantity
    this.computeCartTotals();

  }




  computeCartTotals() {
    //önce hepsini 0'a eşitle
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    //sepetteki bütün ürünler üzerinde loop oluştur:
    for (let currentCardItem of this.cartItems) {
      totalPriceValue += currentCardItem.quantity * currentCardItem.unitPrice;
      totalQuantityValue += currentCardItem.quantity;
    }

    //publish the new values ... all subscribers will receive the this new data. BU KISMA TEKRAR BAK
    //En üstte(Sınıfın altı) tanımladığımız global değerlere gönderdik burada hesapladıklarımızı (next'in görevine bak)
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }




  logCartData(totalPriceValue: number, totalQuantityValue: number) { //Debug amaclı kuruyoruz bu logları

    console.log("Contents of the cart:");
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity= ${tempCartItem.quantity}, subTotalPrice = ${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue}, totalQuantity: ${totalQuantityValue}`);
    console.log("----------------")
  }


  decrementQuantity(theCartItem: CartItem) {
    
    theCartItem.quantity--;

    if(theCartItem.quantity===0){
      this.remove(theCartItem);
    }
    else{
      this.computeCartTotals();
    }

  }



  remove(theCartItem: CartItem) {
    
    //get index of the item in the array

    const itemIndex = this.cartItems.findIndex(tempCartItem =>tempCartItem.id===theCartItem.id);

    //if found, remove the item from array at given index
    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1);

      this.computeCartTotals();
    }

  }


}
