---
title: "Bayesian Approach for Adaptive EMG Pattern Classification via Semi-supervised Sequential Learning"
authors:
  - "Seitaro Yoneda"
  - "Akira Furui"
venue: "Proceedings of 2023 IEEE International Conference on Systems, Man, and Cybernetics (SMC)"
venueShort: "SMC"
year: 2023
pages: "3310-3315"
pdfUrl: "https://drive.google.com/file/d/1oV797VEcID4kGB3W_bw_GBQzg-KIQsI7/view?usp=sharing"
codeUrl: "https://github.com/example/vision-survey"
doi: "10.1109/SMC53992.2023.10394290"
tags:
  - "EMG"
  - "Bayesian Model"
  - "Machine Learning"
  - "Motion Recognition"
type: "international"
coverImage: "https://drive.google.com/file/d/1uAee2TeWZW83gupMBi2oWXTE7ILAMXXJ/view?usp=sharing" 
---
Intuitive human-machine interfaces may be developed using pattern classification to estimate executed human motions from electromyogram (EMG) signals generated during muscle contraction. The continual use of EMG-based interfaces gradually alters signal characteristics owing to electrode shift and muscle fatigue, leading to a gradual decline in classification accuracy. This paper proposes a Bayesian approach for adaptive EMG pattern classification using semi-supervised sequential learning. The proposed method uses a Bayesian classification model based on Gaussian distributions to predict the motion class and estimate its confidence. Pseudo-labels are subsequently assigned to data with high-prediction confidence, and the posterior distributions of the model are sequentially updated within the framework of Bayesian updating, thereby achieving adaptive motion recognition to alterations in signal characteristics over time. Experimental results on six healthy adults demonstrated that the proposed method can suppress the degradation of classification accuracy over time and outperforms conventional methods. These findings demonstrate the validity of the proposed approach and its applicability to practical EMG-based control systems.