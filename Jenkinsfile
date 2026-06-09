pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/Ephraimimmanuel/fullstack-devops-app.git'
            }
        }

        stage('Deploy Frontend To S3') {
            steps {
                bat '''
                aws s3 sync frontend s3://ephraim-fullstack-frontend --delete
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '''
                docker build -t devops-backend ./backend
                '''
            }
        }

        stage('Save Docker Image') {
            steps {
                bat '''
                docker save devops-backend > backend.tar
                '''
            }
        }

        stage('Copy To EC2') {
            steps {
                bat '''
                ssh -i "C:\Users\ephra\Downloads\ephraim-frontend-app.pem" ubuntu@ec2-3-110-193-157.ap-south-1.compute.amazonaws.com
                '''
            }
        }

        stage('Deploy Backend') {
            steps {
                bat '''
                ssh -i "C:\Users\ephra\Downloads\ephraim-frontend-app.pem" ubuntu@3.110.193.157 "
                docker stop backend || true &&
                docker rm backend || true &&
                docker load < backend.tar &&
                docker run -d -p 5000:5000 --name backend devops-backend
                "
                '''
            }
        }

    }
}