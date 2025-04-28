package com.example.trueviewsys.service;

import weka.classifiers.Classifier;
import weka.core.*;
import weka.filters.Filter;
import weka.filters.unsupervised.attribute.StringToWordVector;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.ArrayList;

@Service
public class TextClassificationService {

    private Classifier classifier;
    private StringToWordVector filter;
    private Instances referenceStructure;

    @PostConstruct
    public void init() throws Exception {
        // Modole SVM
        InputStream modelStream = getClass().getClassLoader().getResourceAsStream("data/racism-model.model");
        if (modelStream == null) {
            throw new RuntimeException("Le fichier 'racism-model.model' est introuvable.");
        }
        classifier = (Classifier) weka.core.SerializationHelper.read(modelStream);

        // le filtre TF-IDF 
        InputStream filterStream = getClass().getClassLoader().getResourceAsStream("data/text-vectorizer.model");
        if (filterStream == null) {
            throw new RuntimeException("Le fichier 'text-vectorizer.model' est introuvable.");
        }
        filter = (StringToWordVector) weka.core.SerializationHelper.read(filterStream);

        
        ArrayList<Attribute> attributes = new ArrayList<>();
        attributes.add(new Attribute("text", (ArrayList<String>) null)); 
        ArrayList<String> classValues = new ArrayList<>();
        classValues.add("0"); // NON_RACIST
        classValues.add("1"); // RACIST
        attributes.add(new Attribute("label", classValues)); 

        // Definir structure
        referenceStructure = new Instances("TextInstances", attributes, 1);
        referenceStructure.setClassIndex(1);
    }

    public String classify(String inputText) {
        try {
            // Creer instance
            DenseInstance instance = new DenseInstance(2);
            instance.setDataset(referenceStructure);
            instance.setValue(referenceStructure.attribute("text"), inputText);
            instance.setMissing(referenceStructure.attribute("label")); 

            // Ajouter instance a une copie de la structure
            Instances data = new Instances(referenceStructure);
            data.add(instance);

            // Appliquer le filtre TF-IDF
            filter.input(data.instance(0));
            Instances filteredData = filter.getOutputFormat();
            filteredData.add(filter.output());

            // Faire la prédiction
            double prediction = classifier.classifyInstance(filteredData.instance(0));
            return prediction == 1.0 ? "This text contains racist content." : "This text does not contain racist content";
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la classification : " + e.getMessage(), e);
        }
    }
}