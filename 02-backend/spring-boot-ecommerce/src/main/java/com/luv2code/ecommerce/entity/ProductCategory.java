package com.luv2code.ecommerce.entity;

import java.util.Set;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="product_category")
@Getter //@Data yazmak yerine bu iki annotation da kullanabilirsin
@Setter 
public class ProductCategory {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	@Column(name="category_name")
	private String categoryName;
	
	//Bunun bir column'u yok. Bir productCategory'nin productları tuttuğunu belirteceğiz sadece
	@OneToMany(cascade = CascadeType.ALL,mappedBy = "category") // birden cok products tutuyor.Bu açıdan bakarsak OneToMany'dir
	private Set<Product> products; //Simdi Product.Java'daki kısma bak
	
	
	
}
