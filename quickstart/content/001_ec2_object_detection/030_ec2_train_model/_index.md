---
title: "2. 训练YOLO-V4模型"
date: 2018-10-03T10:17:52-07:00
draft: false
weight: 30
---



1. 登录到EC2实例后，执行如下命令：
该步骤将会安装所有的依赖项，包括底层的CUDA驱动，CUDNN，TensorRT等，该步骤安装耗时约为5分钟。
```angular2html
sudo apt-get update &&
sudo apt-get install -y git cmake awscli libopencv-dev python3-pip unzip zip &&
python3 -m pip install --upgrade pip &&
pip3 install opencv-python==4.5.2.54 &&
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-ubuntu1804.pin &&
sudo mv cuda-ubuntu1804.pin /etc/apt/preferences.d/cuda-repository-pin-600 &&
sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/7fa2af80.pub &&
sudo add-apt-repository "deb https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/ /" &&
sudo apt-get update &&
wget http://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb &&
sudo apt install ./nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb &&
sudo apt-get update &&
wget https://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/libnvinfer7_7.1.3-1+cuda11.0_amd64.deb &&
sudo apt install -y ./libnvinfer7_7.1.3-1+cuda11.0_amd64.deb &&
sudo apt-get update &&
sudo apt-get install -y --no-install-recommends cuda-11-0 libcudnn8=8.0.4.30-1+cuda11.0 libcudnn8-dev=8.0.4.30-1+cuda11.0 --allow-downgrades &&
sudo apt-get install -y --no-install-recommends libnvinfer7=7.1.3-1+cuda11.0 libnvinfer-dev=7.1.3-1+cuda11.0 libnvinfer-plugin7=7.1.3-1+cuda11.0 &&
echo 'export PATH=/usr/local/cuda/bin:$PATH' >> ~/.bashrc &&
echo 'export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH' >> ~/.bashrc &&
source ~/.bashrc
```

2. 上述步骤安装完成后重启机器：
```angular2html
sudo reboot
```

3. 重启后会自动登出，重新SSH登录到EC2实例，并在在命令行敲入`nvidia-smi`，如下所示：
<img src="/images/030_ec2_train_model/train-step-1.png" alt="drawing" width="80%"/>

4. 克隆Darknet框架并编译：
```angular2html
git clone https://github.com/Gaowei-Xu/darknet.git
```
编译darknet：
```angular2html
cd darknet && make -j4
```
运行截图如下所示：
<img src="/images/030_ec2_train_model/train-step-2.png" alt="drawing" width="80%"/>
编译成功后查看可执行文件`darknet`是否存在，即命令行敲入`ls -al darknet`，如出现如下截图，说明编译成功：
<img src="/images/030_ec2_train_model/train-step-3.png" alt="drawing" width="80%"/>


4. 下载训练数据集

    该训练营中使用的行人检测数据集为[WiderPerson](http://www.cbsr.ia.ac.cn/users/sfzhang/WiderPerson/), 该数据集中含有8000张训练图片，
1000张验证图片，将行人分为5个类别：pedestrians，riders，partially-visible persons，ignore regions以及crowd。
<img src="/images/030_ec2_train_model/train-step-4.png" alt="drawing" width="80%"/>
执行如下命令将其下载至darknet/data/目录下并解压：
```angular2html
cd darknet/data
wget -c https://workshop-anker.s3.amazonaws.com/dataset/persons.zip
unzip persons.zip
```
运行截图如下所示：
<img src="/images/030_ec2_train_model/train-step-5.png" alt="drawing" width="80%"/>


6. 启动训练
    
    首先创建backup/persons目录，下载YOLO-V4的预训练模型，
```angular2html
cd ../
mkdir -p backup/persons/
cd backup
wget -c https://github.com/AlexeyAB/darknet/releases/download/darknet_yolo_v3_optimal/yolov4.conv.137
```
运行截图如下：
<img src="/images/030_ec2_train_model/train-step-6.png" alt="drawing" width="80%"/>
   退回到`darknet`目录，执行如下命令开启后台训练：
```angular2html
nohup ./darknet detector train data/persons.data cfg/yolov4-persons.cfg backup/yolov4.conv.137 -dont_show -mjpeg_port 8090 -map > persons_train.log 2>&1 &
```
运行截图如下：
<img src="/images/030_ec2_train_model/train-step-7.png" alt="drawing" width="80%"/>
从上图可以看到一个ID为3823的进程已经在后台运行，当我们SSH退出EC2实例的时候，训练任务不会中断。

6. 查看训练log和GPU资源利用
此时在命令行敲入`nvidia-smi`便可以查看GPU的资源使用率，同时可以用如下命令实时查看训练日志：
```angular2html
tail -f persons_train.log
```
<img src="/images/030_ec2_train_model/train-step-8.png" alt="drawing" width="80%"/>
   键入`CTRL+C`可以中断查看日志。
{{% notice info %}}
训练YOLO-V4目标检测模型，依赖于三个配置，即`darknet/cfg/yolov4-persons.cfg`，`darknet/data/persons.names`和`darknet/data/persons.data`，这三个模型分别
制定了YOLO-V4模型细节和训练周期，学习速率；目标类别信息；和训练数据集合路径配置。
<img src="/images/030_ec2_train_model/train-step-9.png" alt="drawing" width="90%"/>
训练的过程中模型参数会被不断的写入到`backup/persons/`目录下，如下图所示：
<img src="/images/030_ec2_train_model/train-step-10.png" alt="drawing" width="90%"/>
{{% /notice%}}
关于更多`darknet`训练目标检测的细节，请参考[https://github.com/AlexeyAB/darknet](https://github.com/AlexeyAB/darknet)
