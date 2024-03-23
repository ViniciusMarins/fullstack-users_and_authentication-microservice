package br.com.api.project.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
	@NotBlank(message = "The email field is required")
	private String email;
	
	@NotBlank(message = "The password field is required")
	private String password;
	
	public UserDTO(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}
}
