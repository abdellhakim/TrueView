package com.example.trueviewsys.model;

import java.util.Map;

public class DetectionResult {
    private boolean isRacist;
    private double confidenceScore;
    private Map<String, Double> keywordMatches;
    private String processedText;
    private String errorMessage;

    // Constructeurs
    public DetectionResult() {
    }

    public DetectionResult(boolean isRacist, double confidenceScore) {
        this.isRacist = isRacist;
        this.confidenceScore = confidenceScore;
    }

    public DetectionResult(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    // Getters et Setters
    public boolean isRacist() {
        return isRacist;
    }

    public void setRacist(boolean racist) {
        isRacist = racist;
    }

    public double getConfidenceScore() {
        return confidenceScore;
    }

    public void setConfidenceScore(double confidenceScore) {
        this.confidenceScore = confidenceScore;
    }

    public Map<String, Double> getKeywordMatches() {
        return keywordMatches;
    }

    public void setKeywordMatches(Map<String, Double> keywordMatches) {
        this.keywordMatches = keywordMatches;
    }

    public String getProcessedText() {
        return processedText;
    }

    public void setProcessedText(String processedText) {
        this.processedText = processedText;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    // Méthode utilitaire
    public static DetectionResult error(String message) {
        return new DetectionResult(message);
    }

    @Override
    public String toString() {
        return "DetectionResult{" +
                "isRacist=" + isRacist +
                ", confidenceScore=" + confidenceScore +
                ", keywordMatches=" + keywordMatches +
                ", processedText='" + processedText + '\'' +
                ", errorMessage='" + errorMessage + '\'' +
                '}';
    }
}