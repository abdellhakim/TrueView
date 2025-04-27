package com.example.trueviewsys.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

@Service
public class NewsService {

    @Value("${newsapi.key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final NewsCacheService cacheService;

    public NewsService(RestTemplate restTemplate, ObjectMapper objectMapper, NewsCacheService cacheService) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.cacheService = cacheService;
    }

    public List<JsonNode> fetchTopHeadlines() {
        if (!cacheService.isCacheExpired() && cacheService.getCachedArticles() != null) {
            return cacheService.getCachedArticles();
        }

        String url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + apiKey;

        try {
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            JsonNode articles = root.path("articles");

            if (articles.isArray()) {
                List<JsonNode> articleList = objectMapper.convertValue(
                        articles, objectMapper.getTypeFactory().constructCollectionType(List.class, JsonNode.class)
                );
                cacheService.setCachedArticles(articleList);
                return articleList;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return Collections.emptyList();
    }
}
