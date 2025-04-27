package com.example.trueviewsys.dto;

import java.time.LocalDateTime;

public class VerificationDTO {

    private Long id;
    private String text;
    private String result;
    private LocalDateTime createdAt;

    public VerificationDTO(Long id, String text, LocalDateTime createdAt) {
        this.id = id;
        this.text = text;
        this.createdAt = createdAt;
    }

    public VerificationDTO(Long id, String text, String result, LocalDateTime createdAt) {
        this.id = id;
        this.text = text;
        this.result = result;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}