---
title: "Sleep EEG Analysis Based on a Scale Mixture Model and Spindle Detection"
authors:
  - "Miyari Hatamoto"
  - "Akira Furui"
  - "Keiko Ogawa"
  - "Toshio Tsuji"
venue: "Proceedings of the 2022 IEEE/SICE International Symposium on System Integration (SII2022)"
venueShort: "SII"
year: 2022
pages: "887-892"
pdfUrl: "https://drive.google.com/file/d/1U_CdBqRTPcBWuJ9UhEUjLff7C993SDRy/view?usp=sharing"
codeUrl: ""
doi: "10.1109/SII52469.2022.9708856"
tags:
  - "EEG"
  - "Sleep Analysis"
  - "Probabilistic Model"
type: "international"
coverImage: "https://drive.google.com/file/d/1F0Mr_8CTaoEjv1NgvJ-VAAKXWJRsL9wp/view?usp=sharing" 
---
This paper presents analysis of sleep electroen-cephalogram (EEG) based on a scale mixture model. In the scale mixture model, the EEG signal is assumed to be a random variable that follows a infinite mixture of Gaussian distributions with the same mean and different covariance matrices, thereby allowing the representation of the stochastic fluctuation of the EEG amplitude. First, a sleep EEG analysis method was proposed by combining the scale mixture model with band-pass filters and a sliding window, thereby allowing the time-series estimation of the model parameters in a specific frequency band. Then, in experiments, we analyzed the EEG signals during rapid eye movement (REM) sleep and sleep stage II using the proposed analysis method. The results showed that the proposed method captures the characteristic changes in the amplitude distribution of the EEG depending on the sleep stage. Furthermore, we focused on sleep spindles in sleep stage II, which are distinctive waves in sleep EEG, and verified their detectability by machine learning using the features defined by the proposed method as input.