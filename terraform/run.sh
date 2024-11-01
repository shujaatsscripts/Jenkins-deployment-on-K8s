#!/bin/bash

minikube start --memory 8192 --cpus 2
minikube ssh 'sudo mkdir /data/jenkins-volume && sudo chown 1000:1000 -R /data/jenkins-volume'
minikube ssh 'docker pull jenkins/jenkins:2.346.2-jdk11'
sed -i "s|{{Password}}|Docker@1812|" terraform/jenkins-values.yaml
sed -i "s|{{Username}}|devbreed|" terraform/jenkins-values.yaml
#minikube ssh 'docker pull kiwigrid/k8s-sidecar:1.15.0'
#minikube ssh 'docker pull jenkins/inbound-agent:4.11.2-4'
#minikube ssh 'docker pull maorfr/kube-tasks:0.2.0'
cd terraform
terraform init
terraform apply --auto-approve

jsonpath="{.data.jenkins-admin-password}"
secret=$(kubectl get secret -n jenkins jenkins -o jsonpath=$jsonpath)
echo "Password:"
echo $(echo $secret | base64 --decode)

minikube service jenkins -n jenkins --url


