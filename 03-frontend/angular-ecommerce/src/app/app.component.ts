import { Component } from '@angular/core';

//index.html'de burası belirtildiği icin kod bu sınıfa girdi. Bu da template olarak app.component.html'i aldıgı icin:
//app.component.html aslında ana sayfamiz olacak (üst satiri oku)
//Artık diğer component specificationlarımızı orada yapacağız. (index.html'de DEĞİL,orada sadece bu component tanımlanmalı)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';
}
