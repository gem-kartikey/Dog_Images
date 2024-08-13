node {
    def gitUrl = 'https://github.com/gem-kartikey/Dog_Images.git'
    def branch = 'main'
    def credentialsId = '78f52c88-4ff7-4b93-9637-fff00e450f4a'
    def nexusCredentialsId = '581ce8ff-8141-4238-aeda-893bcd450d08'
    def imageName = 'dog-image'  // Docker Hub repository name
    def imageTag = 'latest'
    def nexusUrl = 'localhost:8082/repository/dog-image'
    def KUBE_CONFIG_PATH = "C:\\Users\\Kartikey.Varshney\\.kube\\config"
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

    stage("Login to nexus repository & push image")
    {
        // withCredentials([usernamePassword(credentialsId: nexusCredentialsId, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) 
        // {
        //     bat "echo %PASSWORD% |docker login ${nexusUrl} --username %USERNAME% --password-stdin"
        // }

        // bat "echo jenkins | docker login -u jenkins --password-stdin ${nexusUrl}"

        docker.withRegistry("http://${nexusUrl}", "${nexusCredentialsId}") {
        docker.image("${imageName}:latest").push()
        
        
            echo "pushed successfully.... "
        }
    }
    
    // stage('Publish Image to Nexus Repository') {
    //     def imageId = docker.image("${imageName}:${imageTag}").id
    //     bat "docker tag ${imageId} ${nexusUrl}/${imageName}:${imageTag}"
    //     bat "docker push ${nexusUrl}/${imageName}:${imageTag}"
    //     echo "Image published to Nexus repository..."
        
    // }

    
    stage('Deploy') {
        withEnv(["KUBECONFIG:${KUBE_CONFIG_PATH}"])
        {
            bat 'kubectl apply -f deployment.yaml'
            bat 'kubectl apply -f service.yaml'
        }
        // bat "docker run --name dog-image -p 4000:4000 ${imageName}:${imageTag}"
        
        echo "Deployment applied successfully..."
    }
}
