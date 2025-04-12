package com.example.trueviewsys.service;

import com.example.trueviewsys.dto.RegisterRequest;
import com.example.trueviewsys.dto.LoginRequest;
import com.example.trueviewsys.dto.AuthResponse;
import com.example.trueviewsys.model.User;
import com.example.trueviewsys.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public AuthResponse registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        User user = User.builder()
                .provider(request.getProvider())
                .username(request.getUsername())
                .email(request.getEmail())
                .password("LOCAL".equalsIgnoreCase(request.getProvider()) ?
                        passwordEncoder.encode(request.getPassword()) : request.getPassword())
                .role("USER")
                .build();

        userRepository.save(user);
        return new AuthResponse("User registered successfully", null);
    }

    @Override
    public AuthResponse loginUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // JWT to be added later
        return new AuthResponse("Login successful", null);
    }
}
