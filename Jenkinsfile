pipeline {
    agent any
    environment {
        IP = credentials('server_IP') 
    }

    stages {
        // 1단계: Git 클론
        stage('Git Clone') {
            steps {
                git branch: 'fast_api', credentialsId: 'gitlab-credentials', url: 'https://lab.ssafy.com/s11-final/S11P31B105.git'
            }
            post {
                success { echo 'Repository clone 성공!' }
                failure { echo 'Repository clone 실패!' }
            }
        }

        // 2단계: Docker 이미지 빌드
        stage('Build Docker Image') {
            steps {
                sh 'docker build --no-cache -t fast-api .'  
                echo 'Docker 이미지 빌드 완료'
            }
            post {
                success { echo '이미지 빌드 성공' }
                failure { echo '이미지 빌드 실패' }
            }
        }

        // 3단계: 기존 컨테이너 중지 및 제거
        stage('Stop and Remove Existing Container') {
            steps {
                echo '기존 Fast-API 컨테이너 중지 및 제거 시작'
                sshagent(credentials: ['ec2']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no -p 2201 ubuntu@$IP "
                            docker-compose stop fast-api &&
                            docker-compose rm -f fast-api
                        "
                    '''
                }
                echo '기존 Fast-API 컨테이너 중지 및 제거 완료'
            }
            post {
                success { echo '컨테이너 중지 및 제거 성공' }
                failure { echo '컨테이너 중지 및 제거 실패' }
            }
        }

        // 4단계: 새로운 컨테이너 배포
        stage('Deploy New Container') {
            steps {
                echo 'Fast-API 서비스 배포 시작'
                sshagent(credentials: ['ec2']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no -p 2201 ubuntu@$IP "
                            docker-compose up -d --remove-orphans fast-api
                        "
                    '''
                }
                echo 'Fast-API 서비스 배포 완료'
            }
            post {
                success { echo '배포 성공' }
                failure { echo '배포 실패' }
            }
        }
    }

    post {
        always {
            echo 'Pipeline Execution Complete.'
        }
        success {
            echo 'Pipeline Execution Success.'
            script {
                echo '빌드 / 배포 Success'
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Email = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend(
                    color: 'good',
                    message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Email})",
                    endpoint: 'https://meeting.ssafy.com/hooks/gj9893o8r3fn5bswy3cc7kxn5h',
                    channel: '6f9904adde1b56655e703998b592c88e'
                )
            }
        }
        failure {
            echo 'Pipeline Execution Failed.'
            script {
                echo '빌드 / 배포 Failed'
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Email = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend(
                    color: 'danger',
                    message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Email})",
                    endpoint: 'https://meeting.ssafy.com/hooks/gj9893o8r3fn5bswy3cc7kxn5h',
                    channel: '6f9904adde1b56655e703998b592c88e'
                )
            }
        }
    }
}