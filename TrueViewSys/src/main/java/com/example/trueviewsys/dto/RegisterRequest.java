package com.example.trueviewsys.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String provider;
    private String username;
    private String email;
    private String password;
}
