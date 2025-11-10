package com.ihub.www.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity //@Entity tells Spring to take the variables into a table
@Table(name = "employees")
@Data //tells Lombok to generate getters and setters for the private variables
@AllArgsConstructor //Lombok annotation that automatically creates a constructor with all fields/variables in your class.
@NoArgsConstructor //When you annotate a class with @Entity,		   //JPA needs a default (no-args) constructor to create objects when loading from the database.
public class Employee {
	
	@Id //considers this as a primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	//used in JPA (Java Persistence API) to automatically generate the value of the primary key when saving a new record into the database.
	private long id;
	

	@Column
	private String name;
	
	@Column
	private String exp;
	
	@Column
	private String ph;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date doj;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "deptId_fk")
	private Department dept;

	

}
