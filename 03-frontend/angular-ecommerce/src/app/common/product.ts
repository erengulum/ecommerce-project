// ng generate class common/product komutuyla olusturduk bu sinifi ve spec.ts sınıfını

export class Product {

//default olarak public olduklari icin getter settera ihriyacı yok.Direk böyle yazabilirsin.Public kullanmak yaygın bu dilde
id:string;
sku:string;
name:string;
description:string;
unitPrice:number;
imageUrl:string;
active:boolean;
unitsInStock:number;
dateCreated:Date;
lastUpdated:Date;



}
