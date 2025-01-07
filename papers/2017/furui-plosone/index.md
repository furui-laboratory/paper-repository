---
title: "An Artificial EMG Generation Model Based on Signal-dependent Noise and Related Application to Motion Classification"
authors:
  - "Akira Furui"
  - "Hideaki Hayashi"
  - "Go Nakamura"
  - "Takaaki Chin"
  - "Toshio Tsuji"
venue: "PLOS ONE"
year: 2017
pages: "e0180112"
pdfUrl: "https://drive.google.com/file/d/10xC-toAmoSY1oVbYRERoHFHwY_p1uOTk/view?usp=sharing"
codeUrl: ""
doi: "10.1371/journal.pone.0180112"
volume: "12"
number: "6"
tags:
  - "EMG"
  - "Motion Recognition"
  - "Probabilistic Model"
  - "Data Generation"
type: "journal"
coverImage: "https://drive.google.com/file/d/19few4HU18Aq-S-pJhmEErLR1osGWaDnA/view?usp=sharing" 
---
This paper proposes an artificial electromyogram (EMG) signal generation model based on signal-dependent noise, which has been ignored in existing methods, by introducing the stochastic construction of the EMG signals. In the proposed model, an EMG signal variance value is first generated from a probability distribution with a shape determined by a commanded muscle force and signal-dependent noise. Artificial EMG signals are then generated from the associated Gaussian distribution with a zero mean and the generated variance. This facilitates representation of artificial EMG signals with signal-dependent noise superimposed according to the muscle activation levels. The frequency characteristics of the EMG signals are also simulated via a shaping filter with parameters determined by an autoregressive model. An estimation method to determine EMG variance distribution using rectified and smoothed EMG signals, thereby allowing model parameter estimation with a small number of samples, is also incorporated in the proposed model. Moreover, the prediction of variance distribution with strong muscle contraction from EMG signals with low muscle contraction and related artificial EMG generation are also described. The results of experiments conducted, in which the reproduction capability of the proposed model was evaluated through comparison with measured EMG signals in terms of amplitude, frequency content, and EMG distribution demonstrate that the proposed model can reproduce the features of measured EMG signals. Further, utilizing the generated EMG signals as training data for a neural network resulted in the classification of upper limb motion with a higher precision than by learning from only measured EMG signals. This indicates that the proposed model is also applicable to motion classification.
