package com.example.trueviewsys.dto;

import jakarta.persistence.Column;
import lombok.Data;
import java.time.LocalDate;  // Add this import for LocalDate

@Data
public class RegisterRequest {
    private String provider;
    private String username;
    private String email;
    private String password;
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

}

