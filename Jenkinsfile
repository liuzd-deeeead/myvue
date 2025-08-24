pipeline {
    agent any
    
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            steps {
                // 只在 master 分支部署到生产环境
                script {
                    if (env.BRANCH_NAME == 'master') {
                        sh 'docker cp dist/. nginx-web:/usr/share/nginx/html/'
                        echo 'Deployed to production'
                    } else {
                        echo "Branch ${env.BRANCH_NAME} built successfully, but not deployed"
                    }
                }
            }
        }
    }
}
