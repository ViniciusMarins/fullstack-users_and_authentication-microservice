package br.com.api.project.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data

@Entity
@Table(name="user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@NotBlank(message = "The name field is required")
	@Size(min = 4, message = "Name must be at least 4 characters long")
	@Column(name = "name", length = 200, nullable = false)
	private String name;
	
	@Email(message = "Email is not valid")
	@NotBlank(message = "The email field is required")
	@Column(name = "email", length = 50, nullable = false, unique=true)
	private String email;
	
	@NotBlank(message = "The password field is required")
	@Size(min = 5, message = "Password must be at least 5 characters long")
	@Column(name = "password", columnDefinition = "TEXT", nullable = false)
	private String password;
	
	@NotBlank(message = "The phone field is required")
	@Column(name = "phone", length = 15, nullable = false)
	private String phone;

}
