---
title: "Automated Classification of General Movements in Infants Using Two-stream Spatiotemporal Fusion Network"
authors:
  - "Yuki Hashimoto"
  - "Akira Furui"
  - "Koji Shimatani"
  - "Maura Casadio"
  - "Paolo Moretti"
  - "Pietro Morasso"
  - "Toshio Tsuji"
venue: "Proceedings of 25th International Conference on Medical Image Computing and Computer Assisted Intervention (MICCAI2022)"
venueShort: "MICCAI"
year: 2022
pages: "753-762"
pdfUrl: "https://drive.google.com/file/d/11SUyZkbyxRfYdiuVcZxAMzYWevHB_0HU/view?usp=sharing"
codeUrl: "https://github.com/hashyuki/two-stream-gma"
doi: "10.1007/978-3-031-16434-7_72"
tags:
  - "Medical Image/Video"
  - "Movement Analysis"
  - "Infants"
  - "Deep Learning"
type: "international"
coverImage: "https://drive.google.com/file/d/1_It8dINmyZ_AU6T_mmtHnBDtdCRCY_Et/view?usp=sharing" 
---
The assessment of general movements (GMs) in infants is a useful tool in the early diagnosis of neurodevelopmental disorders. However, its evaluation in clinical practice relies on visual inspection by experts, and an automated solution is eagerly awaited. Recently, video-based GMs classification has attracted attention, but this approach would be strongly affected by irrelevant information, such as background clutter in the video. Furthermore, for reliability, it is necessary to properly extract the spatiotemporal features of infants during GMs. In this study, we propose an automated GMs classification method, which consists of preprocessing networks that remove unnecessary background information from GMs videos and adjust the infant's body position, and a subsequent motion classification network based on a two-stream structure. The proposed method can efficiently extract the essential spatiotemporal features for GMs classification while preventing overfitting to irrelevant information for different recording environments. We validated the proposed method using videos obtained from 100 infants. The experimental results demonstrate that the proposed method outperforms several baseline models and the existing methods.