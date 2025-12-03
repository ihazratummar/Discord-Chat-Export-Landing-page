pipeline {
    agent any

    environment {
        IMAGE = "discord-chat-exporter-landing-page:v1"
        CONTAINER = "discord_chat_exporter_landing_page"
        ENV_FILE = "/home/envs/discord_chat_exporter_landing.env"
    }

    stages {

        stage('Pull Code') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: 'main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/ihazratummar/Discord-Chat-Export-Landing-page',
                        credentialsId: 'github-creds'
                    ]]
                ])
                echo "✅ Code pulled successfully"
            }
        }

        stage('Verify ENV File') {
            steps {
                sh """
                    if [ ! -f ${ENV_FILE} ]; then
                        echo "❌ Missing env file at ${ENV_FILE}"
                        exit 1
                    fi
                    echo "✅ ENV file verified"
                """
            }
        }



        stage('Deploy Landing Page') {
            steps {
                dir('landing_page') {
                    sh """
                        # Download standalone docker-compose binary (if not present)
                        if [ ! -f docker-compose ]; then
                            curl -SL https://github.com/docker/compose/releases/download/v2.30.3/docker-compose-linux-x86_64 -o docker-compose
                            chmod +x docker-compose
                        fi
                        
                        # Build and deploy
                        ./docker-compose down || true
                        ./docker-compose up -d --build
                    """
                }
                echo "🚀 Landing Page deployed successfully"
            }
        }
    }

    post {
        success {
            echo "🎉 Landing Page deployed successfully!"
        }
        failure {
            echo "❌ Deployment failed — fetching logs..."
            sh "docker logs ${CONTAINER} || true"
        }
        always {
            echo "✔ Pipeline complete."
        }
    }
}
