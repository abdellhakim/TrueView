package com.example.trueviewsys.controller;

import com.example.trueviewsys.service.ArticleScraperService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scrape")
public class NewsScrapingController {

    private final ArticleScraperService scraperService;

    public NewsScrapingController(ArticleScraperService scraperService) {
        this.scraperService = scraperService;
    }

    @GetMapping
    public String scrapeArticle(@RequestParam String url) {
        try {
            return scraperService.extractArticleContent(url);
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
