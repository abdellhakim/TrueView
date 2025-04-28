package com.example.trueviewsys.service;

import com.example.trueviewsys.model.User;
import com.example.trueviewsys.model.Verification;

import com.example.trueviewsys.repository.VerificationRepository;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VerificationService {

    @Autowired
    private VerificationRepository verificationRepository;

    public void saveVerification(String text, String result, User user) {
        
        Verification verification = new Verification();
        verification.setText(text);
        verification.setResult(result);

        verification.setUser(user);
        verification.setCreatedAt(LocalDateTime.now());

        // Sauvegardez dans BDD
        verificationRepository.save(verification);
    }
}