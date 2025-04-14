package com.example.trueviewsys.service;

import org.springframework.stereotype.Component;
import org.apache.commons.csv.*;
import org.springframework.core.io.ClassPathResource;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;


@Component
public class DataCleaner {
    private static final String[] OUTPUT_HEADER = {"text", "label"};
    private static final String[] INPUT_HEADER = {"Comment", "Label"};

    public File cleanData() throws IOException {
        Path outputPath = Paths.get("src/main/resources/data/cleaned_data.csv");
        
        try (InputStream inputStream = new ClassPathResource("data/RacismDetectionDataSet.csv").getInputStream();
             Reader reader = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
             CSVParser parser = CSVFormat.DEFAULT.builder()
                 .setHeader(INPUT_HEADER)
                 .setSkipHeaderRecord(true)
                 .build().parse(reader);
             BufferedWriter writer = Files.newBufferedWriter(outputPath);
             CSVPrinter printer = new CSVPrinter(writer, CSVFormat.DEFAULT.builder()
                 .setHeader(OUTPUT_HEADER).build())) {

            parser.forEach(record -> {
                try {
                    String text = cleanText(record.get("Comment"));
                    String label = cleanLabel(record.get("Label"));
                    if (!text.isEmpty() && !label.isEmpty()) {
                        printer.printRecord(text, label);
                    }
                } catch (IOException e) {
                    throw new UncheckedIOException(e);
                }
            });
        }
        return outputPath.toFile();
    }

    private String cleanText(String text) {
        if (text == null || text.isBlank()) return "";
        return text.toLowerCase()
                 .replaceAll("[^a-zéèêëàâäôöûüç\\s]", "")
                 .replaceAll("\\s+", " ")
                 .trim();
    }

    private String cleanLabel(String label) {
        if (label == null) return "";
        label = label.trim();
        return label.matches("[01]") ? label : "";
    }
}