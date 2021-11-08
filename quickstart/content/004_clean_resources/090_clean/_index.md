---
title: "8. 删除资源"
date: 2018-10-03T10:17:52-07:00
draft: false
weight: 90
---

1. 切换到CloudFormation控制台，选中对应的堆栈名，点击右上角Delete，图下图所示：
<img src="/images/090_clean/cloudformation-delete.png" alt="drawing" width="80%"/>


2. 切换到EC2控制台，选中开启的机器，点击右上角Instance State下拉列表中的Terminate instance，如下图所示：
<img src="/images/090_clean/ec2-delete.png" alt="drawing" width="80%"/>

3. 切换到SageMaker控制台，选中Notebook实例，点击右上角Actions中的Stop将该Notebook关闭，关闭后再点击Delete将其删除。
<img src="/images/090_clean/sagemaker-delete.png" alt="drawing" width="80%"/>
