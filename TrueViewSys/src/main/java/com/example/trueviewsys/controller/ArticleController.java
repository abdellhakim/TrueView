package com.example.trueviewsys.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ArticleController {

    @GetMapping("/api/articles")
    public List<Map<String, String>> getArticles() {
        return List.of(
                Map.of(
                        "title", "AI in 2025: What's Next?",
                        "category", "Technology",
                        "author", "John Doe",
                        "date", "April 20, 2025",
                        "imageUrl", "https://via.placeholder.com/300"
                ),
                Map.of(
                        "title", "The Rise of Remote Work",
                        "category", "Business",
                        "author", "Jane Smith",
                        "date", "April 18, 2025",
                        "imageUrl", "https://via.placeholder.com/300"
                )
        );
    }
}
