package com.example.trueviewsys.service;

import com.example.trueviewsys.dto.RegisterRequest;
import com.example.trueviewsys.dto.LoginRequest;
import com.example.trueviewsys.dto.AuthResponse;

public interface UserService {
    AuthResponse registerUser(RegisterRequest request);
    AuthResponse loginUser(LoginRequest request);
}
