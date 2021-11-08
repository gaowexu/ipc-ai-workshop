---
title: "5. 训练行人属性分类器"
date: 2018-10-03T10:17:52-07:00
draft: false
weight: 60
---

1. 打开名为`multi-task-classiifer.ipynb`的文件，设置其运行的Kernel环境为conda_amazonei_tensorflow2_p36（tensorflow 2.x版本，
python 3.6版本），如下图所示：
<img src="/images/060_sagemaker_train_model/sagemaker-train-step-1.png" alt="drawing" width="80%"/>

2. 确保鼠标选中第一个单元（Cell)，选中某一个cell时，其左侧显示蓝色，如下图蓝色框中所示，然后点击Run按钮，如红色框所示，这样便可以逐个运行每一个cell中的代码：
<img src="/images/060_sagemaker_train_model/sagemaker-train-step-2.png" alt="drawing" width="80%"/>
3. 当一个cell中代码正在运行或等待时，其左侧会显示`*`号，如下图红色框所示，此时我们等其运行完毕，再点击Run按钮运行下一个cell:
<img src="/images/060_sagemaker_train_model/sagemaker-train-step-3.png" alt="drawing" width="80%"/>
4. 依次逐步运行每一个代码块，在**步骤五：开始训练任务**代码块运行时，会比较慢，因为它正在执行多任务分类器的训练逻辑：
<img src="/images/060_sagemaker_train_model/sagemaker-train-step-4.png" alt="drawing" width="80%"/>
    训练过程会有详细的日志文件被打印出来，如下图所示：
<img src="/images/060_sagemaker_train_model/sagemaker-train-step-5.png" alt="drawing" width="80%"/>
    在每一个Epoch（整个数据集上的迭代周期）训练完成后，会在验证集合上进行性能验证，如下图所示：
<img src="/images/060_sagemaker_train_model/sagemaker-train-step-6.png" alt="drawing" width="80%"/>

    训练3个Epoch之后在验证集合上的分类准确率评估分别为：
    ```angular2html
    [Validation] Gender Accuracy = 0.9458165322580645
    [Validation] Top Color Top-1 Accuracy = 0.7883,  Top-2 Accuracy = 0.8964,  Top-3 Accuracy = 0.9438
    [Validation] Down Color Top-1 Accuracy = 0.8377,  Top-2 Accuracy = 0.9519,  Top-3 Accuracy = 0.9713
    ```
    ```angular2html
    [Validation] Gender Accuracy = 0.953125
    [Validation] Top Color Top-1 Accuracy = 0.7933,  Top-2 Accuracy = 0.9037,  Top-3 Accuracy = 0.9428
    [Validation] Down Color Top-1 Accuracy = 0.8269,  Top-2 Accuracy = 0.9514,  Top-3 Accuracy = 0.9761
    ```
    ```angular2html
    [Validation] Gender Accuracy = 0.9511088709677419
    [Validation] Top Color Top-1 Accuracy = 0.7873,  Top-2 Accuracy = 0.8904,  Top-3 Accuracy = 0.9302
    [Validation] Down Color Top-1 Accuracy = 0.8261,  Top-2 Accuracy = 0.9509,  Top-3 Accuracy = 0.9708
    ```
5. 训练完毕后，继续运行后续的代码块，最后会基于训练的模型对验证数据集中的图片进行推理和可视化呈现，如下图所示：
<img src="/images/060_sagemaker_train_model/sagemaker-train-step-7.png" alt="drawing" width="80%"/>
    最后可以查看训练过程中保存的模型文件，如下图所示：
<img src="/images/060_sagemaker_train_model/sagemaker-train-step-8.png" alt="drawing" width="80%"/>
    点击`multi_tasks_classifier_models`可以看到每一个Epoch后保存的模型文件，如下图所示：
<img src="/images/060_sagemaker_train_model/sagemaker-train-step-9.png" alt="drawing" width="80%"/>
{{% notice info %}}
至此，您已经完成了利用SageMaker Notebook训练行人属性分类器的过程。
{{% /notice%}}



