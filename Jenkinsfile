node {
    def gitUrl = 'https://github.com/gem-kartikey/Dog_Images.git'
    def branch = 'main'
    def credentialsId = '78f52c88-4ff7-4b93-9637-fff00e450f4a'
    def dockerCredentialsId = 'e4cfc01f-6aa4-488d-8ea6-e316ddc03372'
    def imageName = 'dog-image'  // Docker Hub repository name
    def imageTag = 'latest'
    def nexusUrl = 'localhost:8082/repository/dog-image'

    stage('Clone Repository') {
        try {
            // Checkout the git repository using the credentials
            git branch: branch, url: gitUrl, credentialsId: credentialsId
        } catch (Exception e) {
            error "Failed to clone repository: ${e.getMessage()}"
        }
    }
    
    stage('Build Docker Image') {
        bat "docker build -t ${imageName}:${imageTag} ."
        echo "Build successfully..."
    }
    
    stage('Publish Image to Nexus reopsitory') {
        withCredentials([usernamePassword(credentialsId: dockerCredentialsId, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
            bat "echo $PASSWORD | docker login ${nexusUrl} --username $USERNAME --password-stdin"
            bat "docker tag ${imageName}:${imageTag} ${nexusUrl}/${imageName}:${imageTag}"
            bat "docker push ${nexusUrl}/${imageName}:${imageTag}"
            echo "Image published to Docker Hub..."
        }
    }
    
    stage('Deploy') {
        bat 'kubectl apply -f deployment.yaml'
        bat 'kubectl apply -f service.yaml'
        echo "Deployment applied successfully..."
    }
}
