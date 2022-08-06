# Jenkins deployment on Kubernetes(minikube) with autoscaling executers

## Requirements
This deployment requires certain prerequisites
~~~
         * docker 20.10.17
         * minikube v1.26.1
         * kubectl [Major:"1", Minor:"24"]
         * terraform v1.2.5
~~~

## Instruction to run
Run the shell script to deploy the jenkins server
```
$ bash run.sh
```
or 
```
$ ./run.sh
```
Copy the password and the link printed at the end of the script

Open the link in the browser
Add username as admin and add the password 

### Optional

If you are using any cloudprovider server like EC2 install
then you need ngninx installation

After installation run the following command to configure nginx site
```
$ bash nginx.sh
```

Important: This script will replace default file. If you are already using nginx kindly create a new site with nginx conf

## Step by Step process of the script

These are the folowwing steps taken by the script to run the jenkins server
~~~
          * Minikube cluster creation
          * Images pull from the remote to shorten the deployment time
          * Terraform initialization
          * Namespace creation
          * PresistentVolume creation
          * ServiceAccount creation
          * ClusterRole creation
          * ClusterRolebinding creation
          * Jenkins server deployment using helm
~~~


## References

Jenkins Installation document 
https://www.jenkins.io/doc/book/installing/kubernetes/

Terraform registry documentation
https://registry.terraform.io/

Jenkins deployment on kubernetes with autoscaling
https://www.digitalocean.com/community/tutorials/how-to-install-jenkins-on-kubernetes



This deployment is tested on Windows 11
