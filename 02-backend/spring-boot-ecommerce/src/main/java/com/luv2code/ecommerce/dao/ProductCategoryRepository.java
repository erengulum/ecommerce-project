package com.luv2code.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.luv2code.ecommerce.entity.ProductCategory;


@CrossOrigin("http://localhost:4200") //burayı dinliyoruz
@RepositoryRestResource(collectionResourceRel ="productCategory",path="product-category" )
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long>{
	//Normalde "/productcategories" requesti gelirse buraya girecekti(Spring ilk harfi küçültüp sonuna -s koyuyor.)Ama biz yukarıdaki annotation ile path'i değiştirdik
	//Yani "product-category" requesti gelince burası çalışacak(Rest ile gönderilen JSON verisinin ismi de "productCategory")

	
}
