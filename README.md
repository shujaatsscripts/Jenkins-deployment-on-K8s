# Jenkins deployment on Kubernetes(minikube) with autoscaling executers

## Requirements
This deployment requires certain prerequisites

 * docker 20.10.17
 * minikube v1.26.1
 * kubectl [Major:"1", Minor:"24"]
 * terraform v1.2.5

## Instruction to run
Run the shell script to deploy the jenkins server
```
$ bash terraform/run.sh
```
or 
```
$ terraform/run.sh
```
Copy the password and the link printed at the end of the script

Open the link in the browser
Add username as admin and add the password 

## Instruction to update Infrastructure

To update any configuration in for jenkins update the file jenkins-value.yaml
After update in the file or terrafrom 

Run following command to check the changes
```
$ terraform plan
```
Run following command to perform the changes
```
$ terraform apply --auto-approve
```

## Instruction to remove Infrastructure

To destroy the whole infrastructure run the following command

```
$ minikube delete
```


### Optional

If you are using any cloudprovider server like EC2 install
then you need ngninx installation

After installation run the following command to configure nginx site
```
$ bash nginx/nginx.sh
```

Important: This script will replace default file. If you are already using nginx kindly create a new site with nginx conf

## Step by Step process of the script

These are the folowwing steps taken by the script to run the jenkins server

  * Minikube cluster creation
  * Images pull from the remote to shorten the deployment time
  * Terraform initialization
  * Namespace creation
  * PresistentVolume creation
  * ServiceAccount creation
  * ClusterRole creation
  * ClusterRolebinding creation
  * Jenkins server deployment using helm


## Future plan for this project

These are few recommecndation

  * Deploy Jenkins on EKS instead of kubernetes
  * Deploy Jenkins on EKS with fargate compatibility
  * Abbility to set important custom congiuration of jenkins in terraform.tfvars filr


## References

Jenkins Installation document 
https://www.jenkins.io/doc/book/installing/kubernetes/

Terraform registry documentation
https://registry.terraform.io/

Jenkins deployment on kubernetes with autoscaling
https://www.digitalocean.com/community/tutorials/how-to-install-jenkins-on-kubernetes



This deployment is tested on Windows 11 and Ubuntu 22.04 LTS
