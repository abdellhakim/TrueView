package com.example.trueviewsys.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.List;

@Service
public class NewsCacheService {
    private List<JsonNode> cachedArticles;
    private Instant lastUpdated;

    public List<JsonNode> getCachedArticles() {
        return cachedArticles;
    }

    public void setCachedArticles(List<JsonNode> articles) {
        this.cachedArticles = articles;
        this.lastUpdated = Instant.now();
    }

    public boolean isCacheExpired() {
        return lastUpdated == null || Instant.now().minusSeconds(600).isAfter(lastUpdated); // 10 minutes
    }
}
