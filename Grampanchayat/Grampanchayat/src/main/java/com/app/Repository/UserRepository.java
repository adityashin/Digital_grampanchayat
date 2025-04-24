package com.app.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Role;
import com.app.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	List<User> findByRole(Role roleMembers);

	Optional<User> findByEmail(String email);

}
