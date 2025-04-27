package com.example.trueviewsys.controller;

import com.example.trueviewsys.model.User;
import com.example.trueviewsys.model.Verification;
import com.example.trueviewsys.dto.VerificationDTO;
import com.example.trueviewsys.repository.VerificationRepository;
import com.example.trueviewsys.service.VerificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/verifications")
@CrossOrigin(origins = "http://localhost:5173") 
public class VerificationController {

    @Autowired
    private VerificationRepository verificationRepository;

    @Autowired
    private VerificationService verificationService;

  
    @PostMapping("/save")
    public String saveVerification(@RequestBody VerificationRequest request) {
        
        User user = new User();
        user.setId(1L); 

        if (request.getText() == null || request.getResult() == null) {
            return "Invalid input data!";
        }

        verificationService.saveVerification(request.getText(), request.getResult(), user);

        return "Verification saved successfully!";
    }

    //Recuperer toute les verification 
    @GetMapping("/sidebar")
    public List<VerificationDTO> getVerificationsForSidebar() {
        return verificationRepository.findAll().stream()
                .map(verification -> new VerificationDTO(
                        verification.getId(),
                        verification.getText(),
                        verification.getCreatedAt()))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public VerificationDTO getVerificationDetails(@PathVariable Long id) {
        Verification verification = verificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Verification not found with id " + id));

        return new VerificationDTO(
                verification.getId(),
                verification.getText(),
                verification.getResult(),
                verification.getCreatedAt()
        );
    }

    public static class VerificationRequest {
        private String text;
        private String result;

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }

        public String getResult() {
            return result;
        }

        public void setResult(String result) {
            this.result = result;
        }
    }
}
