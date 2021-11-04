---
title: "1. 启动EC2机器"
date: 2018-10-03T10:17:52-07:00
draft: false
weight: 20
---
1. 创建`IAM User`，进入到亚马逊云科技`IAM`控制台，如下图所示：
![Image](/images/020_ec2_provision/iam-step-1.png)

2. 进入`IAM`控制台之后，选择左侧`Users`，然后选择添加用户按钮 `Add Users`:
![Image](/images/020_ec2_provision/iam-step-2.png)

3. 输入`User name`，如 `ipc-workshop-<your_user_id>`，勾选`Access Key - Programmatic access`和`Password - AWS Management Console access`，
其他项保持默认，点击下一步`Next: Permissions`：
![Image](/images/020_ec2_provision/iam-step-3.png)

4. 紧接着给所创建的`User`增加权限，选择 `Attaching existing policies directly`，
选择 `AdministratorAccess`，点击按钮 `Next: Tags`, 如下图所示：
![Image](/images/020_ec2_provision/iam-step-4.png)

5. 最后创建用户，点击`Download .csv`，并将其保存好，里面包含所创建用户的`Access Key ID`，`Secret Access Key`信息，请妥善保存。
{{% notice warning %}}
注意保存好`Download .csv`，里面包含用户信息，后续会用其来配置云端环境。
{{% /notice%}}
![Image](/images/020_ec2_provision/iam-step-5.png)


6. 切换到亚马逊云科技EC2控制台中：
![Image](/images/020_ec2_provision/ec2-step-1.png)

7. 点击左侧导航栏`Instances`，然后点击按钮`Launch Instances`：
![Image](/images/020_ec2_provision/ec2-step-2.png)

8. 选择`Ubuntu Server 18.04 LTS (HVM), SSD Volume Type 64-bit (x86)`镜像，点击`Select`按钮：
![Image](/images/020_ec2_provision/ec2-step-3.png)

9. 选择机器实例类型为`g4dn.xlarge`，点击下一步`Next: Configure Instance Details`：
![Image](/images/020_ec2_provision/ec2-step-4.png)

10. 保持默认的`VPC`，点击`Next: Add Storage`：
![Image](/images/020_ec2_provision/ec2-step-5.png)

11. 输入`EBS`存储盘大小，如`128GiB`，点击下一步`Next: Add Tags`：
![Image](/images/020_ec2_provision/ec2-step-6.png)

12. 点击按钮`Next: Configure Security Group`：
![Image](/images/020_ec2_provision/ec2-step-7.png)

13. 勾选`Create a new security group`，然后点击`Review and Launch`：
![Image](/images/020_ec2_provision/ec2-step-8.png)

14. 点击`Launch`:
![Image](/images/020_ec2_provision/ec2-step-9.png)

15. 选择`Create a new key pair`，创新新的密钥，如下图所示：
![Image](/images/020_ec2_provision/ec2-step-10.png)

16. 输入密钥的名字，如`ipc-workshop-<your_user_id>`，点击按钮`Download Key Pair`进行下载，下载后妥善保存，
最后点击`Launch Instance`启动实例。
{{% notice warning %}}
注意保存好登录密钥，用来登录适才创建的实例。
{{% /notice%}}
![Image](/images/020_ec2_provision/ec2-step-11.png)


17. 登录前述步骤中创建的EC2实例，首先切换到亚马逊云科技EC2控制台中，找到刚才所创建的EC2，选中它并点击右上方`Connect`按钮，如下图所示：
![Image](/images/020_ec2_provision/ssh-step-1.png)

18. 然后选择`SSH Client`Tab页面，如下图所示，其中红框中标出两条命令行，分别是修改密钥权限的命令，以及SSH登录EC2服务器的命令：
![Image](/images/020_ec2_provision/ssh-step-2.png)

19. 复制上一步骤修改密钥权限的命令，以及SSH登录EC2服务器的命令到密钥所在的目录下运行，如下所示：
```angular2html
chmod 400 ipc-workshop-<your_user_id>.pem
ssh -i "ipc-workshop-<your_user_id>.pem" ubuntu@ec2-your_ip_address.us-east-2.compute.amazonaws.com
```
运行截图如下所示：
![Image](/images/020_ec2_provision/ssh-step-3.png)
   {{% notice warning %}}
   至此，您已经成功登录到EC2实例中，接下来可以训练目标检测模型了。
   {{% /notice%}}
