package com.example.trueviewsys.weka;

import weka.core.Instances;
import weka.core.converters.CSVLoader;
import weka.filters.Filter;
import weka.filters.unsupervised.attribute.NumericToNominal;
import weka.filters.unsupervised.attribute.StringToWordVector;
import weka.filters.supervised.instance.Resample;
import weka.classifiers.Classifier;
import weka.classifiers.functions.SMO;
import weka.classifiers.meta.FilteredClassifier;
import weka.classifiers.Evaluation;
import weka.core.stopwords.Rainbow;
import weka.core.SerializationHelper;

import java.io.File;
import java.util.Random;

public class WekaModelLoader {

    public static void main(String[] args) {
        try {
            //Charger les donnees CSV
            CSVLoader loader = new CSVLoader();
            File csvFile = new File("src/main/resources/data/Data_CleanedV.csv");
            if (!csvFile.exists()) {
                throw new Exception("Le fichier CSV n'existe pas : " + csvFile.getAbsolutePath());
            }
            loader.setSource(csvFile);
            Instances data = loader.getDataSet();

            if (data.numInstances() == 0) {
                throw new Exception("Le fichier CSV est vide ou mal forme.");
            }

            System.out.println("Donnees chargees avec succes. Nombre d'instances : " + data.numInstances());

            //Convertir colonne label en nominal
            NumericToNominal numToNom = new NumericToNominal();
            numToNom.setAttributeIndices("last");
            numToNom.setInputFormat(data);
            data = Filter.useFilter(data, numToNom);

            // Definir la classe a predire
            data.setClassIndex(data.numAttributes() - 1);

            // Verifier equilibre des classes
            int count0 = 0, count1 = 0;
            for (int i = 0; i < data.numInstances(); i++) {
                if ((int) data.instance(i).classValue() == 0) {
                    count0++;
                } else {
                    count1++;
                }
            }
            System.out.println("Nombre de phrases NON RACISTES (0): " + count0);
            System.out.println("Nombre de phrases RACISTES (1): " + count1);

            // TF-IDF vectorisation du texte
            StringToWordVector filter = new StringToWordVector();
            filter.setInputFormat(data);
            filter.setAttributeIndices("first");
            filter.setTFTransform(true);
            filter.setIDFTransform(true);
            filter.setLowerCaseTokens(true);
            filter.setStopwordsHandler(new Rainbow()); 

            Instances filteredData = Filter.useFilter(data, filter);

            //Verifier que le nombre d'attributs correspond apres filtrage
            if (filteredData.numAttributes() <= 1) {
                throw new Exception("Le filtrage a echoue : nombre d'attributs incorrect.");
            }

            System.out.println("Filtrage TF-IDF applique avec succes.");

            //Equilibrer les classes 
            Resample resample = new Resample();
            resample.setBiasToUniformClass(1.0);
            resample.setInputFormat(filteredData);
            filteredData = Filter.useFilter(filteredData, resample);

            System.out.println("Classes equilibrees avec succes.");

            // Classification avec SVM
            Classifier classifier = new SMO();

            //Combiner le filtre et le classifieur
            FilteredClassifier filteredClassifier = new FilteredClassifier();
            filteredClassifier.setFilter(filter);
            filteredClassifier.setClassifier(classifier);

            //Evaluation par validation croisee
            Evaluation eval = new Evaluation(filteredData);
            eval.crossValidateModel(filteredClassifier, filteredData, 10, new Random(1));

            System.out.println("==== Resultats evaluation (SVM) ====");
            System.out.println("Precision: " + (1 - eval.errorRate()) * 100 + "%");
            System.out.println(eval.toSummaryString());

            //Entrainer modele final
            filteredClassifier.buildClassifier(filteredData);

            //Sauvegarder le modele
            String modelPath = "src/main/resources/data/racism-model.model";
            File modelFile = new File(modelPath);
            if (modelFile.exists()) {
                if (!modelFile.delete()) {
                    throw new Exception("Impossible de supprimer l'ancien modele.");
                }
            }
            SerializationHelper.write(modelPath, filteredClassifier);
            System.out.println("Modele SVM enregistre avec succes : " + modelPath);

            String filterPath = "src/main/resources/data/text-vectorizer.model";
            File filterFile = new File(filterPath);
            if (filterFile.exists()) {
                if (!filterFile.delete()) {
                    throw new Exception("Impossible de supprimer l'ancien filtre.");
                }
            }
            SerializationHelper.write(filterPath, filter);
            System.out.println("Filtre TF-IDF enregistre avec succes : " + filterPath);

        } catch (Exception e) {
            System.err.println("Une erreur est survenue : " + e.getMessage());
            e.printStackTrace();
        }
    }
}