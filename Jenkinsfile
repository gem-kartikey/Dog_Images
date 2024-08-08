node {
    def gitUrl = 'https://github.com/gem-kartikey/Dog_Images.git'
    def branch = 'main'
    def credentialsId = '78f52c88-4ff7-4b93-9637-fff00e450f4a'
    def dockerCredentialsId = '7638944f-8bac-4c78-b0af-83ff20799219'
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
    
    stage('Publish Image to Nexus Repository') {
    withCredentials([usernamePassword(credentialsId: dockerCredentialsId, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) 
        {
        bat "echo ${PASSWORD} | docker login ${nexusUrl} --username ${USERNAME} --password-stdin"
        bat "docker tag ${imageName}:${imageTag} ${nexusUrl}/${imageName}:${imageTag}"
        bat "docker push ${nexusUrl}/${imageName}:${imageTag}"
        echo "Image published to Nexus repository..."
        }
    }

    
    stage('Deploy') {
        bat 'kubectl apply -f deployment.yaml'
        bat 'kubectl apply -f service.yaml'
        echo "Deployment applied successfully..."
    }
}
