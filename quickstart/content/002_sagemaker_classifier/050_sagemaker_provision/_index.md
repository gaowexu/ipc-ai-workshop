---
title: "4. 启动SageMaker笔记本"
date: 2018-10-03T10:17:52-07:00
draft: false
weight: 50
---

1. 登录到亚马逊云科技Amazon SageMaker服务控制台：
    ![Image](/images/050_sagemaker_provision/sagemaker-step-1.png)
2. 选择左侧`Notebook`目录下的`Notebook Instances`，然后点击右上角按钮`Create notebook instance`，创新新的笔记本实例：
    ![Image](/images/050_sagemaker_provision/sagemaker-step-2.png)
3. 输入笔记本实例的名称，如`pedestrian-properties-classifier-<your_user_id>`，选择笔记本实例类型为`ml.g4dn.xlarge`，展开
`Additional configuration`，配置存储空间为`128 GB`，如下图所示：
    ![Image](/images/050_sagemaker_provision/sagemaker-step-3.png)
4. 在`Permission and encryption`中`IAM role`选择`Create a new role`，保持默认的权限，如下图所示，点击右下角`Create role`：
    ![Image](/images/050_sagemaker_provision/sagemaker-step-4.png)
5. `IAM role`创建成功后，创建笔记本实例：
    ![Image](/images/050_sagemaker_provision/sagemaker-step-5.png)
6. 创建好笔记本实例后界面如下图所示，其中`Status`为`Pending`状态：
    ![Image](/images/050_sagemaker_provision/sagemaker-step-6.png)
7. 等待几分钟之后，等笔记本实例的状态变为`Inservice`之后，点击右侧`Open Jupyter`按钮，进入笔记本实例，如下图所示：
    ![Image](/images/050_sagemaker_provision/sagemaker-step-7.png)
8. 紧接着下载SageMaker训练脚本：

    点击如下连接分别下载[性别单任务分类器训练脚本](https://workshop-anker.s3.amazonaws.com/scripts/gender_classifier.ipynb)，
[上衣颜色单任务分类器训练脚本](https://workshop-anker.s3.amazonaws.com/scripts/top_color_classifier.ipynb)，
[下身颜色单任务分类模型](https://workshop-anker.s3.amazonaws.com/scripts/down_color_classifier.ipynb) 和
[多任务分类器训练脚本](https://workshop-anker.s3.amazonaws.com/scripts/multi-task-classifier.ipynb)。

    然后点击`Upload`按钮，如下图红色框所示，将刚才下载的行人属性检测训练脚本上传至笔记本实例，如下面两图所示：
       ![Image](/images/050_sagemaker_provision/sagemaker-step-8.png)
       ![Image](/images/050_sagemaker_provision/sagemaker-step-9.png)

9. 上传成功后如下图所示：
       ![Image](/images/050_sagemaker_provision/sagemaker-step-10.png)
    其中`multi-task-classiifer.ipynb`是多任务分类器，接下来将运行该脚本示范训练和推理的过程，其他脚本运行方法一致。


