package com.example.trueviewsys.controller;

import com.example.trueviewsys.model.User;
import com.example.trueviewsys.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/profile/details")
    public User getUserProfile() {
        return userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Utilisateur avec ID 1 non trouvé"));
    }
}
