
import {Product} from "../common/product"

export class CartItem {

    id:string;
    name:string;
    imageUrl:string;
    unitPrice:number;

    //yukarıdakiler, product'ın variableları idi.Yani burada amac productları cartItemlere cevirmek

    //bu productan kac tane oldugunu belirten variable
    quantity:number;


    constructor(product:Product){ //Gelen product'ı kart item'a ceviriyoruz.Bu kadar!
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;

        this.quantity = 1;
    }



}
