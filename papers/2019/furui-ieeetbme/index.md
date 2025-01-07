---
title: "A Scale Mixture-based Stochastic Model of Surface EMG Signals with Variable Variances"
authors:
  - "Akira Furui"
  - "Hideaki Hayashi"
  - "Toshio Tsuji"
venue: "IEEE Transactions on Biomedical Engineering"
venueShort: "IEEE TBME"
year: 2019
pages: "2780-2788"
pdfUrl: "https://drive.google.com/file/d/1T2nT0IZUqT_gTnddT4ZKzX5BFBM_0hz1/view?usp=sharing"
codeUrl: ""
doi: "10.1109/TBME.2019.2895683"
volume: "66"
number: "10"
tags:
  - "EMG"
  - "Machine Learning"
  - "Motion Recognition"
  - "Probabilistic Model"
type: "journal"
coverImage: "https://drive.google.com/file/d/1k3gGkdd7_M6X-85WEXPRg7xfVBnxs6NH/view?usp=sharing" 
---
Surface electromyogram (EMG) signals have typically been assumed to follow a Gaussian distribution. However, the presence of non-Gaussian signals associated with muscle activity has been reported in recent studies, and there is no general model of the distribution of EMG signals that can explain both non-Gaussian and Gaussian distributions within a unified scheme. Methods: In this paper, we describe the formulation of a non-Gaussian EMG model based on a scale mixture distribution. In the model, an EMG signal at a certain time follows a Gaussian distribution, and its variance is handled as a random variable that follows an inverse gamma distribution. Accordingly, the probability distribution of EMG signals is assumed to be a mixture of Gaussians with the same mean but different variances. The EMG variance distribution is estimated via marginal likelihood maximization. Results: Experiments involving nine participants revealed that the proposed model provides a better fit to recorded EMG signals than conventional EMG models. It was also shown that variance distribution parameters may reflect underlying motor unit activity. Conclusion: This study proposed a scale mixture distribution-based stochastic EMG model capable of representing changes in non-Gaussianity associated with muscle activity. A series of experiments demonstrated the validity of the model and highlighted the relationship between the variance distribution and muscle force. Significance: The proposed model helps to clarify conventional wisdom regarding the probability distribution of surface EMG signals within a unified scheme.
