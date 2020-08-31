import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';
import {CartItem} from "../../common/cart-item"
import {CartService} from "../../services/cart.service"

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  //Servis aracılığıyla cekecegimiz veriler bu arrayde tutulacak
  products: Product[] = [];
  currentCategoryId:number=1;
  searchMode:boolean =false;
  previousCategoryId: number = 1;



  //new properties for pagination:
  thePageNumber:number = 1;
  thePageSize:number = 5;
  theTotalElements:number =0;
  previousKeyword:string = null;




  //olusturdugumuz productService'i buraya enjekte ediyoruz. Daha sonra routing icin ActivatedRoute(built-in) enjekte ettik
  constructor(private productService:ProductService,
              private route:ActivatedRoute,
              private cartService:CartService) { }

  
  //Constructor'dan hemen sonra bu method otomatik olarack cagrilacak==> ngOnInit özel bir built-in fonk.dur
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts(); //bu fonksiyonu asagıda tanımlayacagiz.Basitce Servisteki metod aracılıgıyla products list dönüoyr
    });
    
  }


  //Enjekte ettiğimiz ProductService(product.service.ts'e bak) aracılığıyla productlari backend'den cekiyoruz:
  //Bu fonksiyon onInıt'de tanımlı olduğu için direkt olarak calisacaktır
  listProducts(){

    this.searchMode =this.route.snapshot.paramMap.has("keyword"); // search/:keyword ile mi arama yapılıyor diye kontrol ediliyoruz


    if(this.searchMode){ //yani search/:keyword şeklinde bir arama yapılıyorsa
      this.handleSearchProducts();
    }
    else{ //diger durumlarda bunu yap
      this.handleListProducts();
    }

    
  }


  handleSearchProducts(){

    const theKeyword:string = this.route.snapshot.paramMap.get("keyword"); //router'dan keyword parametresinin değerini çekiyoruz

    //if we have a different keyword than previous then set thePageNumber to 1

    if(this.previousKeyword !=theKeyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`)



    //now search the products by using given keyword and assign returned data to the called method
    this.productService.searchProductsPaginate(this.thePageNumber-1, this.thePageSize,theKeyword).subscribe(this.processResult());
    







  }



  handleListProducts(){

    
    //check if "id" parameter is available
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has("id"); //yani bir id verilmiş mi onu kontrol ediyoruz
    if(hasCategoryId){ //id verilmişse sadece o kategorideki productlari cekecegiz.
      //get the "id" param sttring. convert string to a numbe by using "+" symbol (TypeScript'te Stringin basina + koyarsan number'a cevirir)
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id"); //verilen id degerini bu sekil cekiyoruz ve "+" isaretiyle stringe cevirdik

    }
    else{ //Eger bir category id verilmemisse default olarak category id = 1 al
        this.currentCategoryId = 1;
    }

    

    //chech if we a have different category than previous 
    //Note.: Angular will reuse a component if it is currently being viewed
    //if we have a different category id than previous then set thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){

      this.thePageNumber = 1;

    }

    this.previousCategoryId=this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, this.thePageNumber=${this.thePageNumber}`)

    //now get the products for the given category id: id'yi verip servis aracılığıyla o category id'sine sahip productlari cekecegiz
    this.productService.getProductListPaginate(this.thePageNumber-1,
                                              this.thePageSize,
                                              this.currentCategoryId)
                                              .subscribe(this.processResult()); //servis metodundan gelen data'yı this.processResult'a at diyor


  }


  processResult(){
    //json data'sini yukarıda tanımladığımız variablelara mapliyoruz
    return data=>{
        this.products = data._embedded.products; //JSON'un embedded kısmıyla gönderilen productlarimiz, products arrayimize mapleniyor
        this.thePageNumber=data.page.number +1; //JSON'un page kısmıyla gönderilen veriler ise component içinde tanimladığımz variablelara mapleniyor.
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
    };
  }



  updatePageSize(pageSize:number){ //sag altta bir sayfada kac product gönderilsin kısmı icin yazdık burayı
    this.thePageSize = pageSize;
    this.thePageNumber=1; //RESET THE CURRENT PAGE NUMBER TO 1
    this.listProducts(); //Yeni düzende tekrar listelemek icin bu metodu cagiriyoruz
  }


  addToCart(theProduct:Product){

    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    
    const theCartItem = new CartItem(theProduct); //HTML'den gelen product'ı cart item'a çevirdik ve servis metoduna gönderiyoruz
    this.cartService.addToCart(theCartItem);
  
  }



}
