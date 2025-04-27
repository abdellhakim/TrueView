package com.example.trueviewsys.service;

import java.io.*;
import java.nio.file.*;
import java.util.*;

public class NewCleaner {

    public static void main(String[] args) {
        String inputPath = "src/main/resources/data/NewCleanedDataV.csv";
        String outputPath = "src/main/resources/data/Data_CleanedV.csv";

        Set<String> uniqueLines = new HashSet<>();

        try (BufferedReader reader = Files.newBufferedReader(Paths.get(inputPath));
             BufferedWriter writer = Files.newBufferedWriter(Paths.get(outputPath))) {

            String line;
            boolean isFirstLine = true;

            writer.write("comment,label");
            writer.newLine();

            while ((line = reader.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }
                
                int lastComma = line.lastIndexOf(',');
                if (lastComma == -1) continue;

                String comment = line.substring(0, lastComma);
                String label = line.substring(lastComma + 1);

                // Clean comment
                comment = comment.replace("\"", ""); 
                comment = comment.replaceAll("[^\\p{L}\\p{N}\\s]", ""); 
                comment = comment.replaceAll("\\s+", " ").toLowerCase().trim();

                // Clean label
                label = label.replace("\"", "").trim();

                // only 0 or 1 labels
                if (!label.equals("0") && !label.equals("1")) continue;

                String cleanedLine = comment + "," + label;

                if (uniqueLines.add(cleanedLine)) {
                    writer.write(cleanedLine);
                    writer.newLine();
                }
            }

            System.out.println(" Nettoyage terminé : " + outputPath);

        } catch (IOException e) {
            System.err.println(" Erreur pendant le nettoyage : " + e.getMessage());
        }
    }
}