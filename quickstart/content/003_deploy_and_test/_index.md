---
title: "部署与验证"
weight: 13
chapter: true
draft: false
---

#        部署与验证     

接下来该章节，我们将演示基于[AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/) 对行人属性分类模型进行部署的完整步骤。 用户可以根据该教程自定义
算法逻辑并重新部署验证。 部署的架构逻辑如下图所示：
<img src="/images/070_deploy/deploy-architect.png" alt="drawing" width="70%"/>

用户发起HTTP POST请求，携带行人图片（在此之前需要首先进行目标检测来检测出行人的区域并扣取出来，转化为base64编码）发送至
API Gateway，继而路由至Lambda函数，在Lambda函数中调用SageMaker Endpoint对行人性别，上衣颜色和下身颜色进行识别，最后识别结果以JSON
形式返回给调用方。

前置的行人检测模块可以参考亚马逊云科技一件部署[IP摄像头AI SaaS解决方案](https://github.com/aws-samples/amazon-ipc-ai-saas/tree/tensorrt) 进行部署，
在 本章节中将不再重复赘述。

{{% children showhidden="false" %}}
