@Library('ecomm-shared-lib') _

pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:${env.PATH}"
        CI = 'true'
        IMAGE_NAME = 'ecomm-frontend'
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
    }

    stages {
        stage('Detect Environment') {
            steps {
                script { detectEnvironment() }
            }
        }

        stage('Build') {
            steps {
                echo "Building frontend..."
                sh 'npm ci'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo "Running unit tests..."
                sh 'npm test -- --watchAll=false --passWithNoTests'
            }
        }

        stage('Security Scan') {
            steps {
                echo "Running security scan (npm audit)..."
                sh 'npm audit --audit-level=high || true'
            }
        }

        stage('Container Build & Push') {
            when {
                expression { env.PIPELINE_ENV != 'build' }
            }
            steps {
                buildAndPushDockerImage(env.IMAGE_NAME, env.DOCKER_CREDENTIALS_ID)
            }
        }

        stage('Approve Production Deploy') {
            when {
                expression { env.PIPELINE_ENV == 'prod' }
            }
            steps {
                approveProdDeploy()
            }
        }

        stage('Deploy') {
            when {
                expression { env.PIPELINE_ENV != 'build' }
            }
            steps {
                echo "Deploy to ${env.PIPELINE_ENV} - placeholder for Kubernetes (Phase 5)"
                echo "Image: ${IMAGE_NAME}:${env.IMAGE_TAG}"
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
    }
}
