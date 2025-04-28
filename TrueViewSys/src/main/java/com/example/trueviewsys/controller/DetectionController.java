package com.example.trueviewsys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.trueviewsys.dto.TextRequest;
import com.example.trueviewsys.service.TextClassificationService;

@RestController
@RequestMapping("/api")
public class DetectionController {
    private final TextClassificationService textClassificationService;

    @Autowired
    public DetectionController(TextClassificationService textClassificationService) {
        this.textClassificationService = textClassificationService;
    }

    @PostMapping("/classifyText")
    public String classifyText(@RequestBody TextRequest request) {
        return textClassificationService.classify(request.getText());
    }
}