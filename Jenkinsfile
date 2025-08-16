pipeline {
    agent  { docker 'node:18.16.0' }
    stages {
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'echo Deploy...'
            }
        }
    }
}
