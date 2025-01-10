---
title: "Epileptic seizure detection using a recurrent neural network with temporal features derived from a scale mixture EEG model"
authors:
  - "Akira Furui"
  - "Ryota Onishi"
  - "Tomoyuki Akiyama"
  - "Toshio Tsuji"
venue: "IEEE Access"
year: 2024
pages: "162814-162824"
pdfUrl: "https://drive.google.com/file/d/1Up5QqDjI_b69VHX_th7DWfPE3IS0DIcy/view?usp=sharing"
codeUrl: ""
doi: "10.1109/ACCESS.2024.3487637"
volume: "24"
number: "11"
tags:
  - "EEG"
  - "Epileptic Seizure Detection"
  - "Time-series Analysis"
  - "Probabilistic Model"
  - "Deep Learning"
type: "journal"
coverImage: "https://drive.google.com/file/d/1uGnZYP0ZDP6hffBQyV64QEHzeEke0eA4/view?usp=sharing" 
# status: "early_access"
---
Automated detection of epileptic seizures from scalp Electroencephalogram (EEG) is crucial for improving epilepsy diagnosis and management. This paper presents an automated inter-patient epileptic seizure detection method using multichannel EEG signals. The proposed method performs both feature extraction and seizure detection based on a scale mixture-based stochastic EEG model and a recurrent neural network, respectively. Specifically, the stochastic model that can consider uncertainties in the EEG amplitude is first fitted to a specific frequency band of EEG, thereby extracting relevant features of the seizure. Then, a recurrent neural network-based recognition architecture learns the temporal evolution of these features. We evaluated our method using EEG data from 20 patients with focal epilepsy, conducting comprehensive assessments including ablation studies on classifiers and features. The results demonstrate that our approach outperforms static classifiers and existing feature sets, achieving high sensitivity while maintaining acceptable specificity. Furthermore, our feature set showed efficacy both independently and as a complement to existing features, indicating its robustness in seizure detection tasks. These findings reveal that learning the temporal evolution of the stochastic fluctuation and amplitude information of EEG extracted using a stochastic model enables highly accurate seizure detection, potentially advancing automated epilepsy diagnosis in clinical settings.
