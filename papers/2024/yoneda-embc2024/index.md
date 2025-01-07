---
title: "Inter-Subject Variance Transfer Learning for EMG Pattern Classification Based on Bayesian Inference"
authors:
  - "Seitaro Yoneda"
  - "Akira Furui"
venue: "Proceedings of the 46th Annual International Conference of the IEEE Engineering in Medicine & Biology Society (EMBC2024)"
venueShort: "EMBC"
year: 2024
pages: ""
pdfUrl: "https://drive.google.com/file/d/1XRIBVfBQjp2utSZnZtDlc0tL2c13sSTO/view?usp=sharing"
codeUrl: ""
doi: "10.1109/EMBC53108.2024.10782091"
tags:
  - "EMG"
  - "Motion Recognition"
  - "Bayesian Model"
  - "Transfer Learning"
type: "international"
coverImage: "https://drive.google.com/file/d/1uR5T7IzOWOKfq3A19BLkKZx57F6NpAjr/view?usp=sharing" 
# status: "in_press"
---
In electromyogram (EMG)-based motion recognition, a subject-specific classifier is typically trained with sufficient labeled data. However, this process demands extensive data collection over extended periods, burdening the subject. To address this, utilizing information from pre-training on multiple subjects for the training of the target subject could be beneficial. This paper proposes an inter-subject variance transfer learning method based on a Bayesian approach. This method is founded on the simple hypothesis that while the means of EMG features vary greatly across subjects, their variances may exhibit similar patterns. Our approach transfers variance information, acquired through pre-training on multiple source subjects, to a target subject within a Bayesian updating framework, thereby allowing accurate classification using limited target calibration data. A coefficient was also introduced to adjust the amount of information transferred for efficient transfer learning. Experimental evaluations using two EMG datasets demonstrated th effectiveness of our variance transfer strategy and its superiority compared to existing methods.
