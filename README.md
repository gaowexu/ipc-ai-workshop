## Pedestrian Properties Recognition for IP Surveillance Cameras

用户登录成功后执行如下命令:
```angular2html
git clone https://github.com/Gaowei-Xu/darknet.git
cd darknet
make -j4
```

编译成功会生成一个可执行文件`darknet`，如下所示：
```angular2html
ubuntu@ip-11-0-1-218:~/darknet$ ls -al darknet
-rwxrwxr-x 1 ubuntu ubuntu 6705768 Oct 28 04:55 darknet
```


##### 3. 下载数据集开始训练
进入到`darknet/data`文件目录，执行如下命令下载训练数据集并解压缩：
```angular2html
cd darknet/data
wget -c https://workshop-anker.s3.amazonaws.com/dataset/persons.zip
unzip persons.zip

```

创建`models`目录，并下载预训练的模型：
```angular2html
cd darknet/
mkdir -p backup/persons
cd backup/
wget -c https://github.com/AlexeyAB/darknet/releases/download/darknet_yolo_v3_optimal/yolov4.conv.137
```

开始训练，以人脸检测为例，训练启动命令为：
```angular2html
nohup ./darknet detector train data/persons.data cfg/yolov4-persons.cfg backup/yolov4.conv.137 -dont_show -mjpeg_port 8090 -map > persons_train.log 2>&1 &
```

训练完成后在`backup/persons`目录下会自动保存所有阶段的权重文件。

