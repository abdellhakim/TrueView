package com.example.trueviewsys.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {

    private String message;
    private String jwtToken;  // Add jwtToken field

    // Constructor without jwtToken for initial response
    public AuthResponse(String message) {
        this.message = message;
    }
}
