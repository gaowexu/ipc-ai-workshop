---
title: "3. Darknet模型TensorRT优化"
date: 2018-10-03T10:17:52-07:00
draft: false
weight: 30
---

1. 由于`Darknet`训练得到的模型是`.weights`类型，为了提升模型的推理速度，可以对其进行`TensorRT`优化。

    `TensorRT`可以显著加速推理的速度，为了将`Darknet`训练好的`YOLO-v4`模型转化为`TensorRT`版本，我们首先 借助于
[Open Neural Network Exchange](https://onnx.ai/)，将`Darknet`模型转化为`onnx`格式，再将`onnx`格式转化为`TensorRT`格式。
   {{% notice warning %}}
   为了与训练环境不冲突，建议重新开启一台镜像为`Ubuntu Server 18.04 LTS (HVM), SSD Volume Type 64-bit (x86)`，
    实例类型为`g4dn.xlarge`EC2机器，来进行模型转化，开启EC2实例的步骤与**启动EC2实例**小节中一致。
   {{% /notice%}}

    重新开启另一台镜像为`Ubuntu Server 18.04 LTS (HVM), SSD Volume Type 64-bit (x86)`，
    实例类型为`g4dn.xlarge`EC2机器，用与**启动EC2实例**小节中同样的方法SSH登录进实例，命令行执行如下安装命令：
    
    ```angular2html
    sudo apt-get update &&
    sudo apt-get install -y git cmake awscli python3-opencv python3-pip &&
    pip3 install --upgrade pip &&
    pip3 install Cython==0.29.24 &&
    pip3 install onnx==1.4.1 &&
    wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-ubuntu1804.pin &&
    sudo mv cuda-ubuntu1804.pin /etc/apt/preferences.d/cuda-repository-pin-600 &&
    wget https://developer.download.nvidia.com/compute/cuda/11.1.0/local_installers/cuda-repo-ubuntu1804-11-1-local_11.1.0-455.23.05-1_amd64.deb &&
    sudo dpkg -i cuda-repo-ubuntu1804-11-1-local_11.1.0-455.23.05-1_amd64.deb &&
    sudo apt-key add /var/cuda-repo-ubuntu1804-11-1-local/7fa2af80.pub &&
    sudo apt-get update &&
    sudo apt-get -y install cuda &&
    echo 'export PATH=/usr/local/cuda/bin:$PATH' >> ~/.bashrc &&
    echo 'export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH' >> ~/.bashrc &&
    source ~/.bashrc &&
    pip3 install 'pycuda<2021.1' &&
    wget -c https://ip-camera-ai-saas.s3.amazonaws.com/software/nv-tensorrt-repo-ubuntu1804-cuda11.1-trt7.2.3.4-ga-20210226_1-1_amd64.deb &&
    sudo dpkg -i nv-tensorrt-repo-ubuntu1804-cuda11.1-trt7.2.3.4-ga-20210226_1-1_amd64.deb &&
    sudo apt-key add /var/nv-tensorrt-repo-ubuntu1804-cuda11.1-trt7.2.3.4-ga-20210226/7fa2af80.pub &&
    sudo apt-get update &&
    sudo apt-get install -y tensorrt &&
    sudo apt-get install -y python3-libnvinfer-dev
    ```

2. 上述依赖项安装完成后，执行如下命令：
```angular2html
git clone https://github.com/Gaowei-Xu/tensorrt_demos.git
cd tensorrt_demos/plugins && make
```
运行截图如下所示：
![Image](/images/040_darknet_weights_convert/convert-step-1.png)


3. 模型转化：darknet转化为ONNX格式

    下载`Darknet`框架中训练好的`YOLO-v4`模型及其对应的配置文件`yolov4-persons.cfg`， 然后将模型转化为`ONNX`格式:
      {{% notice warning %}}
      由于**训练YOLO-V4**章节中训练过程比较耗时，在训练完成后会在`darknet/backup/persons`目录下生成`yolov4-persons_best.weights`权重文件，
       此处为了演示模型转化的过程，给出我们已经训练完成的一个模型参数[https://workshop-anker.s3.amazonaws.com/models/yolov4-persons_best.weights](https://workshop-anker.s3.amazonaws.com/models/yolov4-persons_best.weights)
      {{% /notice%}}
```angular2html
cd tensorrt_demos/yolo
wget -c https://workshop-anker.s3.amazonaws.com/models/yolov4-persons.cfg
wget -c https://workshop-anker.s3.amazonaws.com/models/yolov4-persons_best.weights
mv yolov4-persons_best.weights yolov4-persons.weights
python3 yolo_to_onnx.py -m yolov4-persons
```
运行截图如下所示：
![Image](/images/040_darknet_weights_convert/convert-step-2.png)
运行成功后会在当前目录下生成名为`yolov4-persons.onnx`的权重文件。

4. 模型转化：ONNX格式转化为TensorRT格式

    紧接着再将ONNX格式转化为TensorRT格式，执行命令如下所示：
```angular2html
python3 onnx_to_tensorrt.py -m yolov4-persons --verbose
```
运行截图如下所示：
![Image](/images/040_darknet_weights_convert/convert-step-3.png)







