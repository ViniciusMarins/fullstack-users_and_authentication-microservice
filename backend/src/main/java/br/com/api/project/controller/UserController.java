package br.com.api.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import br.com.api.project.dto.UserDTO;
import br.com.api.project.model.User;
import br.com.api.project.security.Token;
import br.com.api.project.service.UserService;
import jakarta.validation.Valid;

@RestController
@CrossOrigin("*")
//@RequestMapping("/users")
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/users")
	public ResponseEntity<List<User>> usersList() {
		return ResponseEntity.status(200).body(userService.usersList());
	}

	@PostMapping("/users")
	public ResponseEntity<String> createUser(@Valid @RequestBody User user) {

		Optional<User> tempUser = userService.findUserByEmail(user.getEmail());

		if (tempUser.isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}

		userService.createUser(user);
		return ResponseEntity.status(201).body("Usuário criado com sucesso.");
	}

	@PutMapping("/users")
	public ResponseEntity<User> editUser(@Valid @RequestBody User user) {

		Optional<User> tempUser = userService.findUserById(user.getId());

		if (tempUser.isPresent()) {
			String password = tempUser.get().getPassword();

			User updatedUser = userService.editUser(user, password);

			return ResponseEntity.status(200).body(updatedUser);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable int id) {

		Optional<User> tempUser = userService.findUserById(id);

		if (tempUser.isPresent()) {
			userService.deleteUser(id);
			return ResponseEntity.status(204).build();
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	@GetMapping("/users/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
		Optional<User> tempUser = userService.findUserByEmail(email);

		if (tempUser.isEmpty()) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.status(200).body(tempUser.get());
		}
	}

	@PostMapping("/login")
	public ResponseEntity<Token> authUser(@Valid @RequestBody UserDTO user) {

		Optional<User> tempUser = userService.findUserByEmail(user.getEmail());

		if (tempUser.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Boolean valid = userService.authPassword(tempUser.get(), user.getPassword());

		if (!valid) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		Token token = userService.gerarToken(user);

		return ResponseEntity.ok(token);
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleValidationException(MethodArgumentNotValidException e) {
		Map<String, String> errors = new HashMap<>();

		e.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();

			errors.put(fieldName, errorMessage);
		});

		return errors;
	}

}
