package com.example.trueviewsys.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ArticleScraperService {

    public String extractArticleContent(String url) throws IOException {
        Document doc = Jsoup.connect(url).get();

        // Try to extract the main article content (HTML structure preserved)
        Element article = doc.selectFirst("article");

        if (article != null) {
            return article.html(); // Return HTML content
        }

        // Fallback: extract all <p> tags and preserve HTML structure
        StringBuilder contentBuilder = new StringBuilder();
        for (Element p : doc.select("p")) {
            contentBuilder.append(p.outerHtml());
        }

        return contentBuilder.toString();
    }
}
