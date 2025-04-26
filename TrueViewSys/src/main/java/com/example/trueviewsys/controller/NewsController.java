package com.example.trueviewsys.controller;

import com.example.trueviewsys.service.NewsService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "*")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping
    public List<JsonNode> getTopNews() {
        return newsService.fetchTopHeadlines();
    }
}
