// Uses Declarative syntax to run commands inside a container.
pipeline {
    agent {
        kubernetes {
            // Rather than inline YAML, in a multibranch Pipeline you could use: yamlFile 'jenkins-pod.yaml'
            // Or, to avoid YAML:
            // containerTemplate {
            //     name 'shell'
            //     image 'ubuntu'
            //     command 'sleep'
            //     args 'infinity'
            // }
            yaml '''
apiVersion: v1 
kind: Pod 
metadata: 
    name: dood 
spec: 
    containers: 
      - name: docker-cmds 
        image: devbreed/ubuntu-docker-kubectl:20.04
        tty: true
        resources: 
            requests: 
                cpu: 10m 
                memory: 256Mi 
        volumeMounts: 
          - mountPath: /var/run 
            name: docker-sock 
    volumes: 
      - name: docker-sock 
        hostPath: 
            path: /var/run 
'''
            // Can also wrap individual steps:
            // container('shell') {
            //     sh 'hostname'
            // }
            defaultContainer 'docker-cmds'
        }
    }
    environment{
        dockerhub=credentials('Dockerhub')
        
    }
    
    stages {
        stage('Checkout SCM') {
            steps {
                sh 'git clone https://github.com/shujaatsscripts/nextjsapp.git'
            }
        }
        stage('Push Image') {
            steps {
                sh '''docker build nextjsapp/ -t devbreed/next-app:$BUILD_NUMBER'''
                sh '''echo $dockerhub_PSW | docker login -u $dockerhub_USR --password-stdin'''
                sh '''docker push devbreed/next-app:$BUILD_NUMBER'''
            }
        }
        stage('Deploy Pod') {
            steps {
                sh '''sed -i "s|{{NEXTIMAGE}}|devbreed/next-app:$BUILD_NUMBER|" nextjsapp/deployment.yml'''
                sh '''kubectl apply -f nextjsapp/deployment.yml -n jenkins'''
            }
        }
    }
}

