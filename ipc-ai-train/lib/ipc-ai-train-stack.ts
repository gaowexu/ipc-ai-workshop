import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import * as sagemaker from '@aws-cdk/aws-sagemaker';
import {InstanceClass, InstanceSize} from '@aws-cdk/aws-ec2';
import fs = require('fs');


export class IpcAiTrainStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    /**
     * Provision of S3 Bucket, which stores the trained models
     */
    const ipcAiModelsZoo = new s3.Bucket(
        this,
        'ipcAiModelsZoo',
        {
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        }
    );


    /**
     * Provision of EC2 instance for object detection training using YOLO-v4
     */
    const ipcAiEc2Vpc = new ec2.Vpc(
        this,
        'ipcAiEc2Vpc',
        {
            maxAzs: 2,
            cidr: '10.0.0.0/21',
            enableDnsHostnames: false,
            enableDnsSupport: true,
            natGateways: 1,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'ingress',
                    subnetType: ec2.SubnetType.PUBLIC,
                },
            ]
        }
    );

    const ipcAiTrainEc2SecurityGroup = new ec2.SecurityGroup(
        this,
        'ipcAiTrainEc2SecurityGroup',
        {
            description: 'security group for public subnets',
            vpc: ipcAiEc2Vpc,
            allowAllOutbound: true,
            disableInlineRules: true
    });

    ipcAiTrainEc2SecurityGroup.addIngressRule(
        ec2.Peer.anyIpv4(),  ec2.Port.tcp(22), 'allow SSH access from Internet');

    const ipcAiTrainEc2Role = new iam.Role(
        this,
        'ipcAiTrainEc2Role',
        {
            assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2FullAccess'),
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryFullAccess'),
                iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess'),
            ]
        }
    );

    const ipcAiTrainEc2Instance = new ec2.Instance(
        this,
        "ipcAiTrainEc2Instance",
        {
            vpc: ipcAiEc2Vpc,
            instanceType: ec2.InstanceType.of(InstanceClass.G4DN, InstanceSize.XLARGE),
            machineImage: ec2.MachineImage.genericLinux({
                'us-east-1': "ami-0747bdcabd34c712a"
            }),
            role: ipcAiTrainEc2Role,
            securityGroup: ipcAiTrainEc2SecurityGroup,
            blockDevices: [
                {
                    deviceName: "/dev/sda1",
                    volume: ec2.BlockDeviceVolume.ebs(372),
                }
            ]
        }
    );

    ipcAiTrainEc2Instance.userData.addCommands(
        'cd /home/ubuntu && sudo apt-get update && ' +
        'sudo apt-get install ec2-instance-connect &&' +
        'sudo apt-get install -y git cmake awscli libopencv-dev python3-pip unzip zip && ' +
        'python3 -m pip install --upgrade pip && pip3 install opencv-python==4.5.2.54 && ' +
        'sudo wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-ubuntu1804.pin && ' +
        'sudo mv cuda-ubuntu1804.pin /etc/apt/preferences.d/cuda-repository-pin-600 && ' +
        'sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/7fa2af80.pub && ' +
        'sudo add-apt-repository "deb https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/ /" && ' +
        'sudo apt-get update && ' +
        'sudo wget http://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb && ' +
        'sudo apt install ./nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb && ' +
        'sudo apt-get update && ' +
        'sudo apt-get install -y --no-install-recommends cuda-11-0 libcudnn8=8.0.4.30-1+cuda11.0 libcudnn8-dev=8.0.4.30-1+cuda11.0 --allow-downgrades && ' +
        'echo "export PATH=/usr/local/cuda/bin:$PATH" >> /home/ubuntu/.bashrc && ' +
        'echo "export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH" >> /home/ubuntu/.bashrc'
    );


    /**
     * Provision of SageMaker notebook for training pedestrian gender classification & cloth color classification
     */
    const ipcAiTrainNotebookRole = new iam.Role(
        this,
        'ipcAiTrainNotebookRole',
        {
            assumedBy: new iam.ServicePrincipal('sagemaker.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSageMakerFullAccess'),
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryFullAccess'),
                iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess'),
            ]
        }
    );

    const onCreateScript = fs.readFileSync('./notebook/onCreate.sh', 'utf8');
    const ipcAiTrainNotebookLifecycleConfig = new sagemaker.CfnNotebookInstanceLifecycleConfig(
        this,
        'ipcAiTrainNotebookLifecycleConfig',
        {
            onCreate: [{content: cdk.Fn.base64(onCreateScript!)}],
        }
    );

    new sagemaker.CfnNotebookInstance(
        this,
        'ipcAiTrainNotebookInstance',
        {
            lifecycleConfigName: ipcAiTrainNotebookLifecycleConfig.notebookInstanceLifecycleConfigName,
            roleArn: ipcAiTrainNotebookRole.roleArn,
            instanceType: 'ml.g4dn.xlarge',
            volumeSizeInGb: 128,
        }
    );




  }
}
