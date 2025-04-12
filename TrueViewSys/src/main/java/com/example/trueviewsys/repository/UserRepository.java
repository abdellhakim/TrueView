package com.example.trueviewsys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.trueviewsys.model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

}
