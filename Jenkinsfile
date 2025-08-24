pipeline {
    agent {
         docker {
            image 'node:18-alpine'  // 包含 Node.js 的镜像
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building project...'
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'main') {
                        echo 'Deploying to production...'
                        sh 'docker cp dist/. nginx-web:/usr/share/nginx/html/'
                        echo 'Deployed successfully!'
                    } else {
                        echo "Branch ${env.BRANCH_NAME} built successfully, but not deployed to production"
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            echo 'Pipeline finished.'
        }
    }
}
