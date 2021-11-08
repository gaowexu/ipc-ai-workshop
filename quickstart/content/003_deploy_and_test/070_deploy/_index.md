---
title: "6. CDK云端部署"
date: 2018-10-03T10:17:52-07:00
draft: false
weight: 70
---

1. 在该章节中，采取基于EC2的方式进行解决方案部署，首先开启一台EC2，镜像选择Ubuntu Server 18.04 LTS (HVM), SSD Volume Type 64-bit (x86)，如下图所示：
<img src="/images/070_deploy/deploy-step-1.png" alt="drawing" width="80%"/>

2. 实例类型选择t3.medium，网络选择Up to 5Gigabit，如下图所示，点击下一步Next: Configure Instance Details:
<img src="/images/070_deploy/deploy-step-2.png" alt="drawing" width="80%"/>

3. 保持默认的VPC设置，如下图所示，点击下一步Next: Add Storage:
<img src="/images/070_deploy/deploy-step-3.png" alt="drawing" width="80%"/>

4. 输入存盘盘大小128 GiB，点击下一步Next: Add Tags，如下图所示：
<img src="/images/070_deploy/deploy-step-4.png" alt="drawing" width="80%"/>

5. 点击下一步Next: Configure Security Group，如下图所示：
<img src="/images/070_deploy/deploy-step-5.png" alt="drawing" width="80%"/>

6. 选择创建新的安全组，默认是打开SSH 22 端口，点击Review and Launch按钮，如下图所示：
<img src="/images/070_deploy/deploy-step-6.png" alt="drawing" width="80%"/>

7. 点击Launch：
<img src="/images/070_deploy/deploy-step-7.png" alt="drawing" width="80%"/>

8. 选择在第一章节（**基于EC2训练行人检测模型**）中创建的密钥名称，如ipc-workshop-<your_user_id>，勾选
I acknowledge that I have access to the corresponding private key file, and that without this file, I won't be able to log into my instance.
然后点击Launch Instances按钮开启机器，如下图所示：
<img src="/images/070_deploy/deploy-step-8.png" alt="drawing" width="80%"/>

9. 创建成功后，点击如下图所示的实例ID，如下图所示：
<img src="/images/070_deploy/deploy-step-8-2.png" alt="drawing" width="80%"/>

10. 然后切换到SSH Client Tab页面，复制红框中的SSH命令：
<img src="/images/070_deploy/deploy-step-8-3.png" alt="drawing" width="80%"/>

11. 本地打开Terminal，进入到SSH密钥所在的目录，登录刚开启的EC2服务器，如下图所示：
<img src="/images/070_deploy/deploy-step-9-1.png" alt="drawing" width="80%"/>

12. 登录进EC2服务器成功后执行如下安装命令，安装Docker和nodejs，如下图所示：

    安装Docker：
```angular2html
sudo apt-get update && 
sudo apt-get install -y git unzip zip awscli ca-certificates curl gnupg lsb-release && 
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg &&
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null &&
sudo apt-get update &&
sudo apt-get install -y docker-ce docker-ce-cli containerd.io &&
sudo chmod 666 /var/run/docker.sock
```
{{% notice info %}}
Docker安装之后，在命令行输入`docker ps`，如果出现`"CONTAINER ID  IMAGE  COMMAND  CREATED  STASTUS   PORTS   NAMES"`，说明安装成功。 
{{% /notice%}}

    安装nodejs：
```angular2html
sudo apt-get update &&
sudo apt-get -y upgrade &&
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo bash - &&
sudo apt-get install -y nodejs
```

13. 配置AWS用户，在命令行`aws configure`，输入在第一章节（**基于EC2训练行人检测模型**）中创建IAM User时下载的Download.csv文件中对应的
Access Key ID，Secret Access Key字段，如下图所示，Default output format [None]字段输入您所在的region，如`us-east-2`，如下图所示：
<img src="/images/070_deploy/deploy-step-9-3.png" alt="drawing" width="80%"/>



14. 克隆源代码并编译推理镜像，编译成功后将其推送至ECR存储，即分别执行下面三条命令：
    ```angular2html
    git clone https://github.com/gaowexu/peddet.git
    cd peddet/deployment/
    ./build-ecr.sh <your_region_name> <your_aws_account_id> <your_image_name>
    ```
最后执行`./build-ecr.sh`可执行脚本时候，需输入三个参数，分别region名，账号名，以及自定义的镜像名称，镜像名需要与后续部署时输入保持一致。
运行过程如下图所示：
<img src="/images/070_deploy/deploy-step-9-4.png" alt="drawing" width="80%"/>

    该步骤大概耗时5分钟左右，当出现如下图所示的状态时，说明镜像编译成功，并且已经成功的推入ECR（镜像仓库）。
<img src="/images/070_deploy/deploy-step-9-5.png" alt="drawing" width="80%"/>


15. 启动部署，首先进入source目录，然后执行如下所示的命令：
```angular2html
cd ../source
npm install

npm run cdk bootstrap aws://unknown-account/unknown-region  # 云账户中首次CDK部署堆栈时需要执行该行命令
export STACK_NAME=<your_stack_name>
npm run cdk deploy -- --parameters imageName=<your_image_name>
```
    运行图示如下所示：
<img src="/images/070_deploy/deploy-step-10-1.png" alt="drawing" width="80%"/>
    
    最后输入y开启部署，如下图所示：
<img src="/images/070_deploy/deploy-step-10-2.png" alt="drawing" width="80%"/>

    等待十分钟左右便可出现如下图所示输出界面，表示该解决方案的部署成功：
<img src="/images/070_deploy/deploy-step-10-3.png" alt="drawing" width="80%"/>

16. 记录下API Gateway的输出URL，如`https://ciuxcqcplb.execute-api.us-east-2.amazonaws.com/prod/`，该地址将是推理的调用地址。
