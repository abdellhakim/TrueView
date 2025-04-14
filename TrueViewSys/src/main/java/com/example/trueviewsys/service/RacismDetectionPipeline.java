package com.example.trueviewsys.service;

import weka.classifiers.Classifier;
import weka.core.*;
import org.springframework.stereotype.Component;
import java.util.ArrayList;

@Component
public class RacismDetectionPipeline {
    private Classifier model;
    
    public String predict(String text) throws Exception {
        // 1. Créer les attributs avec ArrayList au lieu de FastVector
        ArrayList<Attribute> attributes = new ArrayList<>();
        attributes.add(new Attribute("text", (ArrayList<String>) null));
        
        // 2. Créer le dataset
        Instances dataset = new Instances("textClassification", attributes, 1);
        
        // 3. Ajouter l'instance
        Instance instance = new DenseInstance(1);
        instance.setValue(0, text);
        dataset.add(instance);
        dataset.setClassIndex(0);
        
        // 4. Faire la prédiction
        double prediction = model.classifyInstance(dataset.firstInstance());
        return prediction == 1.0 ? "RACISTE" : "NON_RACISTE";
    }
}