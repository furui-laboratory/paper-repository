---
title: "Mixupを利用した筋電位信号の擬似データ生成と複合動作の識別"
authors:
  - "矢沢 樹"
  - "古居 彬"
venue: "第24回計測自動制御学会システムインテグレーション部門講演会（SI2023）"
venueShort: "SI"
year: 2023
month: 12
pages: "363-368"
pdfUrl: "https://drive.google.com/file/d/1cX6Pg7jFCljllDY1RlUnI3Yl9YahSZY1/view?usp=sharing"
tags:
  - "EMG"
  - "Machine Learning"
  - "Motion Recognition"
  - "Data Generation"
type: "domestic"
coverImage: "https://drive.google.com/file/d/1I9aZNR6RK0DvsM7LlgEJgie7KYbW07DN/view?usp=sharing" 
---
筋電位信号を用いた動作識別では，識別対象の全ての動作について訓練用データを収集する必要がある．しかし，実用上重要な多自由度の複合動作に関して，その全てをユーザから網羅的に計測することは非現実的である．本稿では，データ拡張手法であるMixupを利用した擬似データ生成により，複合動作を効率的に識別可能な手法を提案する．提案法では，基本動作時の計測信号と，その凸結合によって擬似的に生成された複合動作時の信号を識別器の訓練用データとして用いる．これにより，訓練用の計測動作数を抑えつつ，多様な複合動作を識別することが可能となる．実験では，健常成人から得られた筋電位信号を用いて提案法の有効性を検証した．
