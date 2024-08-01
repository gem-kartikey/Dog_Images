node {
    def gitUrl = 'https://github.com/gem-kartikey/Dog_Images.git'
    def branch = 'main'
    def credentialsId = '78f52c88-4ff7-4b93-9637-fff00e450f4a'
    def nexus_credentials = 'd9553985-3e45-4075-bcea-58d2ecdaf140'
    def nexusUrl = 'http://localhost:8081/repository/Dog_images/'
    
    stage('Clone repository') {
        try {
            // Checkout the git repository using the credentials
            git branch: branch, url: gitUrl, credentialsId: credentialsId
        } catch (Exception e) {
            throw e
        }
    }
    
    stage('Building Docker Image') {
        bat 'docker build -t dog-image:latest .'
        echo "Build successfully..."
    }
    
    stage('Publish image to Nexus') {
        withDockerRegistry([credentialsId: nexus_credentials, url: nexusUrl]) {
            bat 'docker tag dog-image:latest ${nexusUrl}/dog-image:latest'
            bat 'docker push ${nexusUrl}/dog-image:latest'
            echo "Image published to Nexus repo..."
        }
    }
    
    stage('Deploy') {
        bat 'kubectl apply -f deployment.yaml'
        bat 'kubectl apply -f service.yaml'
    }
}
