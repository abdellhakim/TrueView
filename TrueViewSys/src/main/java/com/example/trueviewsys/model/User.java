package com.example.trueviewsys.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String provider;
    private String username;
    private String email;
    private String password;
    private String role;
    private LocalDate dateOfBirth;

    @Setter
    @Getter
    @Column(columnDefinition = "TEXT")
    private String profilePictureUrl;

}