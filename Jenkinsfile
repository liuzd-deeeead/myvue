pipeline {
    agent {
        docker {
            image 'docker:20.10.7'  // docker CLI 镜像
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    tools {
        nodejs 'nodejs'  // 在全局工具配置中定义的名称
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
