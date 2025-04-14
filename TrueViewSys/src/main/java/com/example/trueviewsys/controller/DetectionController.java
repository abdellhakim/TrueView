package com.example.trueviewsys.controller;

import com.example.trueviewsys.service.RacismDetectionPipeline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DetectionController {
    
    private final RacismDetectionPipeline pipeline;
    
    @Autowired
    public DetectionController(RacismDetectionPipeline pipeline) {
        this.pipeline = pipeline;
    }
    
    @PostMapping("/detect")
    public String detect(@RequestBody String text) {
        try {
            return pipeline.predict(text);
        } catch (Exception e) {
            return "ERREUR: " + e.getMessage();
        }
    }
    
    @GetMapping("/status")
    public String status() {
        return "Service actif - Prêt à analyser";
    }
}