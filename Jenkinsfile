node {
    def gitUrl = 'https://github.com/gem-kartikey/Dog_Images.git'
    def branch = 'main'
    def credentialsId = '78f52c88-4ff7-4b93-9637-fff00e450f4a'
    def dockerCredentialsId = 'f7496fe7-ef42-4ecd-9434-3e02a03ef0d1'
    def imageName = 'dog-image'  // Docker Hub repository name
    def imageTag = 'latest'
    def nexusUrl = 'localhost:8082'

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

    stage("Login to nexus repository")
    {
        withCredentials([usernamePassword(credentialsId: dockerCredentialsId, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) 
        {
            bat "echo jenkins | docker login -u jenkins --password-stdin ${nexusUrl}"
        }
        
    }
    
    stage('Publish Image to Nexus Repository') {
        def imageId = docker.image("${imageName}:${imageTag}").id
        bat "docker tag ${imageId} ${nexusUrl}/${imageName}:${imageTag}"
        bat "docker push ${nexusUrl}/${imageName}:${imageTag}"
        echo "Image published to Nexus repository..."
        
    }

    
    stage('Deploy') {
        bat "docker run --name dogimage -p 4000:4000 ${nexusUrl}/${imageName}:${imageTag}"
        // bat 'kubectl apply -f deployment.yaml'
        // bat 'kubectl apply -f service.yaml'
        echo "Deployment applied successfully..."
    }
}
