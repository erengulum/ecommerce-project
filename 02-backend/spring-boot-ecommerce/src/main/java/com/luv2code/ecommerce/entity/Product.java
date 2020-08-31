package com.luv2code.ecommerce.entity;

import java.math.BigDecimal;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Entity
@Table(name="product") //mysql'deki tablonun ismi (baglanti ayarlarını .properties'de yapmıstık.Baska ayara gerek yok)
@Data //lombok icin
public class Product {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	//Foreign key ile mapleme işlemi iki yönlüdür: Birinci taraf ManyToOne
	@ManyToOne //önce ProductCategory'de map edilen yeri oku sonra buraya bak
	@JoinColumn(name="category_id",nullable = false) //Product table'indaki category_id foreign key görevi görüyor. Bu Id'ye göre productCategory'e erisecegiz
	private ProductCategory category;
	
	
	@Column(name="sku")
	private String sku;
	
	@Column(name="name")
	private String name;
	
	@Column(name="description")
	private String description;
	
	@Column(name="unit_price")
	private BigDecimal unitPrice;
	
	@Column(name="image_url")
	private String imageUrl;
	
	@Column(name="active")
	private boolean active;
	
	@Column(name="units_in_stock")
	private int unitsInStock;
	
	@Column(name="date_created")
	@CreationTimestamp
	private Date dateCreated;
	
	@Column(name="last_updated")
	@UpdateTimestamp
	private Date lastUpdated;
	

}
