package com.example.trueviewsys.service;

import java.io.File;

import org.springframework.stereotype.Component;

import weka.core.Instances;
import weka.core.converters.CSVLoader;
import weka.filters.Filter;
import weka.filters.unsupervised.attribute.StringToWordVector;

@Component
public class DataPreprocessor {
    private static final int MAX_FEATURES = 5000;

    public Instances prepareData(File csvFile) throws Exception {
        CSVLoader loader = new CSVLoader();
        loader.setSource(csvFile);
        Instances data = loader.getDataSet();

        StringToWordVector filter = new StringToWordVector();
        filter.setInputFormat(data);
        filter.setWordsToKeep(MAX_FEATURES);
        filter.setTFTransform(true);
        filter.setIDFTransform(true);
        filter.setLowerCaseTokens(true);

        Instances processedData = Filter.useFilter(data, filter);
        processedData.setClassIndex(processedData.numAttributes() - 1);
        return processedData;
    }
}