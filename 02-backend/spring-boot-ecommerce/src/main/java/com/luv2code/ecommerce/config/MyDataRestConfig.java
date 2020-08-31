package com.luv2code.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;

/*
 DATA REST sayesinde, Repositoryler aracılığıyla(ecommerce.dao'da yer alanlar) direkt olarak veri tabanları üzerinde CRUD operasyonları yapıyoruz
 Mesela PUT requestiyle veriyi güncelleme ya da DELETE ile silme gibi işlemler otomatik olarak Repository interfaceleri ile yapılıyor.
 
 FAKAT!!!! : Biz Client tarafının bütün CRUD operasyonlarını yapmasını istemeyiz. Sadece Read işlemlerini yapabilmeli, veritabanına müdahale
 edememeliler. İşte bu yüzden bu Config sınıfını oluşturduk ve GET (yani okuma) requestleri dışındaki diğer requestleri Client tarafına iptal edeceğiz.
 
 Yani client tarafı POST,DELETE,PUT gibi komutları iptal edecegiz. 
 */

@Configuration //sonucta bir configuration dosyasi
public class MyDataRestConfig implements RepositoryRestConfigurer{
	
	
	
	
	/*Önemli: GET methoduyla request istenirken, Data REST id özelliğini client'a göndermez. Id hariç diğer bilgiler gönderilir ama id gönderilmez
	Fakat bizim Angular tarafında id'ye ihtiyacımız var bu yüzden, JSON olarak gönderilen bilgiler için de "id" bilgisinin de olmasini istiyoruz
	Bu yüzden asagidaki islemleri yapıyoruz*/
	
	private EntityManager entityManager; //yukarıda bahsettiğimiz işi yapmak icin EntityManager'i enjekte ediyoruz
	@Autowired
	public MyDataRestConfig(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}
	
	
	
	
	

	
	//bu metodu override edeceğiz (bunu sağ tık->Source->Implement methods'tan bulduk )
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		
				
		//iptal edecegimiz methodları bir arraye attık
		HttpMethod[] theUnsupportedActions = {HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};
		
		
		
		//Disable HTTP methods for Product: PUT,POST,DELETE
		config.getExposureConfiguration()
					.forDomainType(Product.class)
					.withItemExposure((metdata,httpMethods) -> httpMethods.disable(theUnsupportedActions))
					.withCollectionExposure((metdata,httpMethods) -> httpMethods.disable(theUnsupportedActions));
		
		
		
		//Disable HTTP methods for ProductCategory: PUT,POST,DELETE
		config.getExposureConfiguration()
					.forDomainType(ProductCategory.class)
					.withItemExposure((metdata,httpMethods) -> httpMethods.disable(theUnsupportedActions))
					.withCollectionExposure((metdata,httpMethods) -> httpMethods.disable(theUnsupportedActions));
		
		
		//call an internal helper method to expose id column (id'yi de JSON'a eklemesini istiyoruz)
		exposeIds(config);
			
	}







	private void exposeIds(RepositoryRestConfiguration config) {
		//expose entity ids
		
		//get a list of alll entity classes from entity manager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		
		
		//create an array of the entity types
		
		List<Class> entityClasses = new ArrayList<>();
		
		
		//get the entity types for the entities
		for(EntityType tempEntityType:entities) {
			entityClasses.add(tempEntityType.getJavaType());
		}
		
		//expose the entity ids for the array of entity/domain types
		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
		
		
		
	}

	
}
