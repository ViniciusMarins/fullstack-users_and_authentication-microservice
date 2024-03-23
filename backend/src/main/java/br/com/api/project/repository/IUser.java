package br.com.api.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.api.project.model.User;

public interface IUser extends JpaRepository<User, Integer>{
	
	Optional<User> findByEmail(String email);
}
