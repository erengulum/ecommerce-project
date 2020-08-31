package com.luv2code.ecommerce.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.luv2code.ecommerce.entity.Product;

/*unutma interfacelerde de inheritance var bu yüzden extends dedik

 "/products" yazan REST'lerde kod buraya girecek: Spring, Entity'nin ilk harfini küçük yazığ sonuna "-s" ekler. ==> /products
*/

@CrossOrigin("http://localhost:4200") //burayı dinliyoruz
public interface ProductRepository extends JpaRepository<Product, Long>{
	
	
	
	Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
	/*category id ile product'lari sorgulayacagimiz icin burada yeni bir method belirtimi yapmalıyız (implementasyon yapmayacagiz cünkü INTERFACE)
	ilginc bir sekilde basina "findBy" yapinca spring kendisi parametre değerine göre otomatik olarak  bu query işini hallediyormuş.ARASTIR!!!
	Endpoint'i de (yani hangi url'de bu calisacak) method ismine göre otomatik olarak olusturuyor:Yani asagidaki url'de bu method calisacak:
	--> localhost:8080/api/products/search/findByCategoryId&id= ..
	*/
	
	
	//Spring yine bunu arka planda halledecek ve name'i uyuşan productlari dönecek (Spring magic). Bunu da incelemek lazım (Arkada query calistiriyor)
	Page<Product> findByNameContaining(@RequestParam("name") String name,Pageable pageable);
	
}
