pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Ephraimimmanuel/fullstack-devops-app.git'
            }
        }

        stage('Deploy Frontend To S3') {
            steps {
                withAWS(credentials: 'aws-creds', region: 'ap-south-1'){
                bat '''
                aws s3 sync frontend s3://ephraim-fullstack-frontend --delete
                '''
                }
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
                scp -o StrictHostKeyChecking=no -i "C:/Users/ephra/Downloads/ephraim-frontend-app.pem" backend.tar ubuntu@ec2-3-110-193-157.ap-south-1.compute.amazonaws.com:/home/ubuntu/
                '''
            }
        }

        stage('Deploy Backend') {
    steps {
        bat '''
        ssh -o StrictHostKeyChecking=no -i "C:/Users/ephra/Downloads/ephraim-frontend-app.pem" ubuntu@ec2-3-110-193-157.ap-south-1.compute.amazonaws.com "docker load < /home/ubuntu/backend.tar && docker stop backend || true && docker rm backend || true && docker run -d -p 5000:5000 --name backend devops-backend"
        '''
    }
}

    }
}