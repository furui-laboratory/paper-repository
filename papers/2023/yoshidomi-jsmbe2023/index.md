---
title: "CNN-LSTMとプラーク表面情報を用いた超音波動画像中のJellyfish Sign自動識別"
authors:
  - "吉冨 孟志"
  - "久米 伸治"
  - "相澤 宏旭"
  - "古居 彬"
venue: "第62回日本生体医工学会大会"
year: 2023
month: 5
pages: "P1-24, p. 272"
pdfUrl: ""
tags:
  - "Medical Image/Video"
  - "Ultrasound Imaging"
  - "Deep Learning"
  - "Time-series Analysis"
type: "domestic"
coverImage: "" 
---
【目的】頸動脈超音波検査により，非侵襲かつリアルタイムにプラーク病変の動的性状を評価できる．近年，血流の拍動によってプラーク表面が浮き沈みするJellyfish signという特徴が注目されており，この特徴を呈した症例の多くが脳梗塞を発症したと報告されていることから，Jellyfish signを早期に発見できれば有用である．そこで本稿では，動画像解析と深層学習を用いてJellyfish signを自動識別可能な手法を提案する．【方法】提案法では，まず計測された頸動脈超音波動画像に対して前処理を施し，血管壁全体の動きとプラークの動きを分離する．その後，前処理後の動画像と事前に検査者が指定したプラーク表面情報を結合し，CNNとLSTMから構成される深層ニューラルネットワークに入力する．これにより，プラーク表面の拍動性変化であるJellyfish signの特徴を考慮した識別が可能である．実験では，Jellyfish sign陽性100例，陰性100例のデータセットを用いて提案法の精度検証を行った．【結果】実験の結果，提案法は80％以上の精度でJellyfish signを識別可能であることが確認された．また，入力にプラーク表面情報を加えることで分類精度が向上することが明らかとなった．【結論】プラーク表面の情報を利用した深層学習が，Jellyfish signの自動識別において有効であることが示された．
