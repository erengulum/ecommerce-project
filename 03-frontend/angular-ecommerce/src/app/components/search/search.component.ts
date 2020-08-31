import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  //Html tarafında bu fonksiyonu cagirmistik. Bu da değeri alıp Router'a gönderecek.BU componentte yapılacak tek is bu
  doSearch(value:string){
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`); //bu metodla, app.module'da tanımladığımız router eşleşmesine gidiyor.Oradan da orada belirtilen componente gidecek
  }

}
