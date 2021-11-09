---
title: "1. 启动EC2机器"
date: 2018-10-03T10:17:52-07:00
draft: false
weight: 20
---
1. 创建IAM User，进入到亚马逊云科技IAM控制台，如下图所示：
<img src="/images/020_ec2_provision/iam-step-1.png" alt="drawing" width="80%"/>

2. 进入IAM控制台之后，选择左侧Users，然后选择添加用户按钮 Add Users:
<img src="/images/020_ec2_provision/iam-step-2.png" alt="drawing" width="80%"/>

3. 输入User name，如`ipc-workshop-<your_user_id>`，勾选Access Key - Programmatic access和Password - AWS Management Console access，
其他项保持默认，点击下一步Next: Permissions：
<img src="/images/020_ec2_provision/iam-step-3.png" alt="drawing" width="80%"/>

4. 紧接着给所创建的User增加权限，选择 Attaching existing policies directly，
选择 AdministratorAccess，点击按钮 Next: Tags, 如下图所示：
<img src="/images/020_ec2_provision/iam-step-4.png" alt="drawing" width="80%"/>

5. 最后创建用户，点击`Download .csv`，并将其保存好，里面包含所创建用户的Access Key ID，Secret Access Key信息，请妥善保存。
{{% notice warning %}}
注意保存好`Download .csv`，里面包含用户信息，后续在第三章节（**部署与验证**）会用其来配置云端环境。
{{% /notice%}}
<img src="/images/020_ec2_provision/iam-step-5.png" alt="drawing" width="80%"/>


6. 切换到亚马逊云科技EC2控制台中：
<img src="/images/020_ec2_provision/ec2-step-1.png" alt="drawing" width="80%"/>

7. 点击左侧导航栏Instances，然后点击按钮Launch Instances：
<img src="/images/020_ec2_provision/ec2-step-2.png" alt="drawing" width="80%"/>

8. 选择Ubuntu Server 18.04 LTS (HVM), SSD Volume Type 64-bit (x86)镜像，点击Select按钮：
<img src="/images/020_ec2_provision/ec2-step-3.png" alt="drawing" width="80%"/>

9. 选择机器实例类型为g4dn.xlarge，点击下一步Next: Configure Instance Details：
<img src="/images/020_ec2_provision/ec2-step-4.png" alt="drawing" width="80%"/>

10. 保持默认的VPC，点击Next: Add Storage：
<img src="/images/020_ec2_provision/ec2-step-5.png" alt="drawing" width="80%"/>

11. 输入EBS存储盘大小，如128GiB，点击下一步Next: Add Tags：
<img src="/images/020_ec2_provision/ec2-step-6.png" alt="drawing" width="80%"/>

12. 点击按钮Next: Configure Security Group：
<img src="/images/020_ec2_provision/ec2-step-7.png" alt="drawing" width="80%"/>

13. 勾选Create a new security group，然后点击Review and Launch：
<img src="/images/020_ec2_provision/ec2-step-8.png" alt="drawing" width="80%"/>

14. 点击Launch:
<img src="/images/020_ec2_provision/ec2-step-9.png" alt="drawing" width="80%"/>

15. 选择Create a new key pair，创新新的密钥，密钥对类型选择RSA，如下图所示：
<img src="/images/020_ec2_provision/ec2-step-10.png" alt="drawing" width="80%"/>

16. 输入密钥的名字，如`ipc-workshop-<your_user_id>`，点击按钮Download Key Pair进行下载，下载后妥善保存，
最后点击Launch Instance启动实例。
{{% notice warning %}}
注意保存好登录密钥，用来登录适才创建的实例。
{{% /notice%}}
<img src="/images/020_ec2_provision/ec2-step-11.png" alt="drawing" width="80%"/>


17. 登录前述步骤中创建的EC2实例，首先切换到亚马逊云科技EC2控制台中，找到刚才所创建的EC2，选中它并点击右上方Connect按钮，如下图所示：
<img src="/images/020_ec2_provision/ssh-step-1.png" alt="drawing" width="80%"/>


19. 然后选择SSH Client Tab页面，如下图所示，其中红框中标出两条命令行，分别是修改密钥权限的命令，以及SSH登录EC2服务器的命令：
<img src="/images/020_ec2_provision/ssh-step-2.png" alt="drawing" width="80%"/>

20. 复制上一步骤修改密钥权限的命令，以及SSH登录EC2服务器的命令到密钥所在的目录下运行，如下所示：
```angular2html
chmod 400 ipc-workshop-<your_user_id>.pem
ssh -i "ipc-workshop-<your_user_id>.pem" ubuntu@ec2-your_ip_address.us-east-2.compute.amazonaws.com
```
运行截图如下所示：
<img src="/images/020_ec2_provision/ssh-step-3.png" alt="drawing" width="80%"/>
   {{% notice warning %}}
   至此，您已经成功登录到EC2实例中，接下来可以训练目标检测模型了。
   {{% /notice%}}
