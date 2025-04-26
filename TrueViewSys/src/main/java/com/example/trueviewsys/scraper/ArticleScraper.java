package com.example.trueviewsys.scraper;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

@Service
public class ArticleScraper {

    public String extractFullContent(String articleUrl) {
        try {
            Document doc = Jsoup.connect(articleUrl).get();

            // Clean up scripts, styles, buttons, links, share icons
            doc.select("script, style, nav, footer, button, a, iframe, svg, .share, .social, .ad, .footer, .header").remove();

            Element article = doc.selectFirst("article");
            if (article == null) article = doc.body(); // fallback to entire page

            Elements paragraphs = article.select("p");
            Elements images = article.select("img");

            StringBuilder htmlBuilder = new StringBuilder();

            // Append images at top
            for (Element img : images) {
                String src = img.absUrl("src");
                if (src != null && !src.isEmpty()) {
                    htmlBuilder.append("<img src=\"").append(src).append("\" style=\"max-width:100%; margin: 10px 0;\" />");
                }
            }

            // Append clean paragraphs
            for (Element p : paragraphs) {
                String text = p.text();
                if (text.length() > 40 && !text.toLowerCase().contains("facebook") && !text.toLowerCase().contains("twitter")) {
                    htmlBuilder.append("<p>").append(text).append("</p>");
                }
            }

            return htmlBuilder.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to retrieve full article content.";
        }
    }
}
