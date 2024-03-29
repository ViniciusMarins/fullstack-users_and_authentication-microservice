package br.com.api.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.api.project.dto.UserDTO;
import br.com.api.project.model.User;
import br.com.api.project.repository.IUser;
import br.com.api.project.security.Token;
import br.com.api.project.security.TokenUtil;
import jakarta.validation.Valid;

@Service
public class UserService {

	private final IUser repository;
	private final PasswordEncoder passwordEncoder;

	public UserService(IUser repository) {
		this.repository = repository;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}

	public List<User> usersList() {
		return this.repository.findAll();
	}

	public User createUser(User user) {
		String encoder = this.passwordEncoder.encode(user.getPassword());

		user.setPassword(encoder);
		return this.repository.save(user);
	}

	public User editUser(User user, String password) {

		if (!(password.equals(user.getPassword()))) {
			String encodePassword = this.passwordEncoder.encode(user.getPassword());
			user.setPassword(encodePassword);
		}

		return this.repository.save(user);
	}

	public void deleteUser(int id) {
		this.repository.deleteById(id);
	}

	public Optional<User> findUserById(int id) {
		return this.repository.findById(id);
	}

	public Optional<User> findUserByEmail(String email) {
		return this.repository.findByEmail(email);
	}

	public Boolean authPassword(User user, String password) {
		Boolean valid = passwordEncoder.matches(password, user.getPassword());

		return valid;
	}

	public Token gerarToken(@Valid UserDTO user) {
		Optional<User> tempUser = this.repository.findByEmail(user.getEmail());

		return new Token(TokenUtil.createToken(tempUser.get()));
	}

}
