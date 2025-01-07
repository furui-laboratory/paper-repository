---
title: "Evaluating Classifier Confidence for Surface EMG Pattern Recognition"
authors:
  - "Akira Furui"
venue: "Proceedings of 45th Annual International Conference of the IEEE Engineering in Medicine and Biology Society"
venueShort: "EMBC"
year: 2023
pages: "3310-3315"
pdfUrl: "https://drive.google.com/file/d/1d9TX3PWIDtYr2g6UeyRy0KGk7jL11iE_/view?usp=sharing"
codeUrl: ""
arxivUrl: "https://arxiv.org/abs/2304.05898"
doi: "10.1109/EMBC40787.2023.10340977"
tags:
  - "EMG"
  - "Machine Learning"
  - "Motion Recognition"
type: "international"
coverImage: "https://drive.google.com/file/d/1WLlfs_rA54oyNMYrIaiTDq8ucIn9eeQU/view?usp=sharing" 
---
Surface electromyogram (EMG) can be employed as an interface signal for various devices and software via pattern recognition. In EMG-based pattern recognition, the classifier should not only be accurate, but also output an appropriate confidence (i.e., probability of correctness) for its prediction. If the confidence accurately reflects the likelihood of true correctness, then it will be useful in various application tasks, such as motion rejection and online adaptation. The aim of this paper is to identify the types of classifiers that provide higher accuracy and better confidence in EMG pattern recognition. We evaluate the performance of various discriminative and generative classifiers on four EMG datasets, both visually and quantitatively. The analysis results show that while a discriminative classifier based on a deep neural network exhibits high accuracy, it outputs a confidence that differs from true probabilities. By contrast, a scale mixture model-based classifier, which is a generative classifier that can account for uncertainty in EMG variance, exhibits superior performance in terms of both accuracy and confidence.