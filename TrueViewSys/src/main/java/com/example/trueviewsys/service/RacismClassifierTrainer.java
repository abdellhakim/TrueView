package com.example.trueviewsys.service;

import weka.classifiers.*;
import weka.classifiers.meta.FilteredClassifier;
import weka.classifiers.trees.RandomForest;
import weka.core.Instances;
import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class RacismClassifierTrainer {
    public Classifier train(Instances data) throws Exception {
        FilteredClassifier classifier = new FilteredClassifier();
        classifier.setClassifier(new RandomForest());
        
        Evaluation eval = new Evaluation(data);
        eval.crossValidateModel(classifier, data, 10, new Random(42));
        
        System.out.println("=== Évaluation ===");
        System.out.println(eval.toSummaryString());
        System.out.println(eval.toMatrixString());
        
        classifier.buildClassifier(data);
        return classifier;
    }
}