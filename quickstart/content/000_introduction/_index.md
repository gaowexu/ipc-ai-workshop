---
title: "概述"
date: 2018-10-03T10:17:52-07:00
draft: false
weight: 10
---

<img src="/images/pipeline.png" alt="drawing" width="70%"/>

在该训练营中，我们将训练如上图所示的行人检测及其属性识别的神经网络模型，主要内容包括如下三方面：

1. 行人检测属于典型的目标检测算法类别，有众多的算法可以参考，如Faster RCNN, YOLO, SSD, CenterNet等等，该训练营中以YOLO-V4为例，演示目标检测的训练过程及其模型转化。 
2. 该训练营中行人属性识别任务包括行人性别，上衣颜色，下身颜色三类，这三者均属于分类任务，该训练营中将演示基于Tensorflow搭建多任务分类模型，并利用SageMaker Notebook进行训练得到模型参数。
3. 最后以行人属性识别为例将SageMaker Notebook训练得到的模型进行CDK云端部署，最后暴露一个API调用接口，可以进行实时推理。