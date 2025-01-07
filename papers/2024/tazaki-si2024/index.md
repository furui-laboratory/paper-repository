---
title: "敵対的学習に基づく患者不変特徴を利用したてんかん発作検出"
authors:
  - "田﨑 莉菜"
  - "矢沢 樹"
  - "米田 清太朗"
  - "秋山 倫之"
  - "古居 彬"
venue: "第25回計測自動制御学会システムインテグレーション部門講演会（SI2024）"
venueShort: "SI"
year: 2024
month: 12
pages: "2840-2845"
pdfUrl: ""
tags:
  - "EEG"
  - "Epileptic Seizure Detection"
  - "Deep Learning"
  - "Domain generalization"
type: "domestic"
coverImage: "https://drive.google.com/file/d/1VZmhs2_Apo_ZuZD6AJoqthcnFthV9nj1/view?usp=sharing" 
---
This paper proposes an electroencephalogram (EEG)-based epileptic seizure detection method using patient-invariant features. The proposed method combines convolutional neural network (CNN) and bidirectional long short-term memory (BiLSTM) in a two-stage learning process. First, a CNN is trained to extract patient-invariant features through adversarial training with a label predictor and domain classifier. Then, BiLSTM is connected to the CNN and fine-tuned to capture temporal changes in the extracted features. This approach enables robust seizure detection that is less sensitive to individual patient differences. The proposed method was evaluated using data from 20 patients, demonstrating its effectiveness in generalizability across different patients.
