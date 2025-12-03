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

        stage('Release to GitHub') {
            steps {
                withEnv(["GH_TOKEN=${GH_TOKEN}"]) {
                    dir('app') {
                        script {
                            // Define version
                            def version = sh(script: "node -p \"require('./package.json').version\"", returnStdout: true).trim()
                            def tagName = "v${version}"
                            
                            echo "Releasing version ${tagName} to GitHub..."

                            // Install gh cli if not present (or assume it is in the agent)
                            // For now, we assume 'gh' is installed or we use a docker image that has it.
                            // If not, we might need to install it. Let's try to use a docker image for this step or install it.
                            // Installing gh on the fly:
                            sh """
                                (type -p wget >/dev/null || (sudo apt update && sudo apt-get install wget -y)) \
                                && sudo mkdir -p -m 755 /etc/apt/keyrings \
                                && wget -qO- https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
                                && sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
                                && echo "deb [arch=\$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
                                && sudo apt update \
                                && sudo apt install gh -y
                            """

                            // Create release and upload assets
                            // We need to point to the correct repo: ihazratummar/DCE-Downloads
                            sh """
                                gh release create ${tagName} \
                                    --repo ihazratummar/DCE-Downloads \
                                    --title "Release ${tagName}" \
                                    --notes "Automated release for version ${version}" \
                                    dist/DiscordChatExporter-Mac.dmg \
                                    dist/DiscordChatExporter-Windows.exe \
                                    || echo "Release ${tagName} might already exist, trying to upload assets..."
                                
                                # If release exists, upload assets (optional handling)
                                # gh release upload ${tagName} dist/DiscordChatExporter-Mac.dmg dist/DiscordChatExporter-Windows.exe --clobber --repo ihazratummar/DCE-Downloads
                            """
                        }
                    }
                }
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
