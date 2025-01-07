---
title: "EMG pattern recognition via Bayesian inference with scale mixture-based stochastic generative models"
authors:
  - "Akira Furui"
  - "Takuya Igaue"
  - "Toshio Tsuji"
venue: "Expert Systems with Applications"
year: 2021
pages: "115644"
pdfUrl: "https://drive.google.com/file/d/1sdNTf3d-ozxriQs4FKr439fuQqfyZJ-k/view?usp=sharing"
codeUrl: ""
doi: "10.1016/j.eswa.2021.115644"
volume: "185"
tags:
  - "EMG"
  - "Machine Learning"
  - "Motion Recognition"
  - "Bayesian Model"
type: "journal"
coverImage: "https://drive.google.com/file/d/1Bld1lBrGC7cNdSExRXlFS1QTk9QmaF0B/view?usp=sharing" 
---
Electromyogram (EMG) has been utilized to interface signals for prosthetic hands and information devices owing to its ability to reflect human motion intentions. Although various EMG classification methods have been introduced into EMG-based control systems, they do not fully consider the stochastic characteristics of EMG signals. This paper proposes an EMG pattern classification method incorporating a scale mixture-based generative model. A scale mixture model is a stochastic EMG model in which the EMG variance is considered as a random variable, enabling the representation of uncertainty in the variance. This model is extended in this study and utilized for EMG pattern classification. The proposed method is trained by variational Bayesian learning, thereby allowing the automatic determination of the model complexity. Furthermore, to optimize the hyperparameters of the proposed method with a partial discriminative approach, a mutual information-based determination method is introduced. Simulation and EMG analysis experiments demonstrated the relationship between the hyperparameters and classification accuracy of the proposed method as well as the validity of the proposed method. The comparison using public EMG datasets revealed that the proposed method outperformed the various conventional classifiers. These results indicated the validity of the proposed method and its applicability to EMG-based control systems. In EMG pattern recognition, a classifier based on a generative model that reflects the stochastic characteristics of EMG signals can outperform the conventional general-purpose classifier.