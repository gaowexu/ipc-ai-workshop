#!/bin/bash

set -e

# download scripts and dataset
cd /home/ec2-user/SageMaker
echo "Fetching the scripts and data..."

wget -c https://workshop-anker.s3.amazonaws.com/scripts/down_color_classifier.ipynb
wget -c https://workshop-anker.s3.amazonaws.com/scripts/top_color_classifier.ipynb
wget -c https://workshop-anker.s3.amazonaws.com/scripts/gender_classifier.ipynb
wget -c https://workshop-anker.s3.amazonaws.com/scripts/multi-task-classifier.ipynb
