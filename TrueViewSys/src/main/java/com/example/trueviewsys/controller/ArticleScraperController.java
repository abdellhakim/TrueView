package com.example.trueviewsys.controller;

import com.example.trueviewsys.scraper.ArticleScraper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scraper")
public class ArticleScraperController {

    @Autowired
    private ArticleScraper scraperService;

    @GetMapping("/full-content")
    public String getFullArticleContent(@RequestParam String url) {
        return scraperService.extractFullContent(url);
    }
}