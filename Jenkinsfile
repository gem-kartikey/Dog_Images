node {
    def gitUrl = 'https://github.com/gem-kartikey/Dog_Images.git'
    def branch = 'main'
    def credentialsId = '78f52c88-4ff7-4b93-9637-fff00e450f4a'
    def dockerCredentialsId = 'a0d3cb57-d789-49f5-aa39-5148dbee388c'
    def repositoryName = 'dog_image'  // Docker Hub repository name
    
    stage('Clone Repository') {
        try {
            // Checkout the git repository using the credentials
            git branch: branch, url: gitUrl, credentialsId: credentialsId
        } catch (Exception e) {
            error "Failed to clone repository: ${e.getMessage()}"
        }
    }
    
    stage('Build Docker Image') {
        bat 'docker build -t dog-image:latest .'
        echo "Build successfully..."
    }
    
    stage('Publish Image to Docker Hub') {
        withCredentials([usernamePassword(credentialsId: dockerCredentialsId, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            bat 'echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin'
            bat 'docker tag dog-image:latest %DOCKER_USERNAME%/%repositoryName%:latest'
            bat 'docker push %DOCKER_USERNAME%/%repositoryName%:latest'
            echo "Image published to Docker Hub..."
        }
    }
    
    stage('Deploy') {
        bat 'kubectl apply -f deployment.yaml'
        bat 'kubectl apply -f service.yaml'
        echo "Deployment applied successfully..."
    }
}
