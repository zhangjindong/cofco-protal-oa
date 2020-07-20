node {
    currentBuild.result = "SUCCESS"
    def nodeHome  = tool 'NODEJS_8_12_0'
    // def nodeHome  = tool 'NODEJS_10_19_0'
    name_list = "$JOB_NAME".split('/')        //eg : 'qloudservice-qloudapi/master' --> ['qloudservice-qloudapi', 'master']
    def ver = "$BRANCH".split('/')[-1]              //eg : 'master'
    def job = "$JOB_NAME".split('/')[0]              //eg : 'qloudservice-qloudapi'
    job_list = "$job".split('-')      //eg : 'qloudservice-qloudapi' --> ['qloudservice', 'qloudapi']
    def project = job_list[0]            //eg : 'qloudservice'
    job_size = job_list.size() - 1
    img_list = []


     for (x in (1..job_size)) {
         img_list.add(job_list[x])
     }
     def img = img_list.join('-')

     def ver_map = ["master": "latest", "developWithNewPaas": "latest"]
     if (ver_map.containsKey(ver)) {
         ver = ver_map.get(ver) + "$BUILD_NUMBER"
     }
     def chart_ver = "$ver".replace("latest", "0.0.")
     def tag = "reg.qloudhub.com/'${project}'/'${img}':'${ver}'"    //reg.qloudhub.com/qloudobp/parmui:latest48

     def script_dir = project + '/' + img + '/' + ver
     def slug_dir = "/tmp/'${script_dir}'"                          //  /tmp/qloudobp/parmui/latest48
     def slug_file = "'${slug_dir}'/universal.tgz"  


    try {

            stage('Check out') {
                //sh 'rm -rf ./*'
                checkout scm

            }

            // code build
            stage('Build') {
                withEnv(["PATH+NODE=${ nodeHome }/bin"]) {                   
                   
                    sh "rm -rf node_modules"
                    sh "npm config set registry='http://10.11.141.34:8081/nexus/content/repositories/chain-npm-repo/' "
                    //sh 'npm cache clean --force'
                    sh 'npm install --production'
                    // sh 'npm run build'
                 
                    // dir('cofco-portal-static'){
                    //     sh "rm -rf node_modules"
                    //     sh "npm config set registry='http://10.11.141.34:8081/nexus/content/repositories/chain-npm-repo/' "
                    //     //sh 'npm cache clean --force'
                    //     sh 'npm install'
                    //     sh 'npm run build:prod'
                    // }
                }

            }
            //slug_dir  /tmp/qloudobp/parmui/latest48
            //slug_file  /tmp/qloudobp/parmui/latest48/universal.tgz
            //tag      reg.qloudhub.com/qloudobp/parmui:latest48
            // Mirror construction
            stage('Docker build') {
                // sh("mv ecosystem.config.js ./dist")
                // sh("mv Dockerfile ./dist")
                // dir('dist'){
                    sh("mkdir -p '${slug_dir}'")
                    sh("tar -z --exclude='.git' --exclude='./src' -cf '${slug_file}' .")
                    sh("mv ${slug_file} .")
                    sh("docker build -t ${tag} .")
                    sh("docker push ${tag}")
                // }
            }
           
            // push chart
            stage('Send Helm') {
                def gitUrl = 'http://gitlab.cofco.com/qloudchart/facibusi.git'
                def gitCredentialsId = 'jenkins'
                git credentialsId: "${gitCredentialsId}", url: "${gitUrl}"
                    def chart_name = "${project}${img}"
                    sh("helm package --app-version=$ver --version=$chart_ver $chart_name")


                    def char_tgz = chart_name + '-' + chart_ver + '.tgz'
                    sh("""
                        curl -v --data-binary "@${char_tgz}"  http://10.11.141.41:8080/api/charts
                        """)
                    sh("""
                        curl -k -u "token-bgzm2:bpg7zrwh8q6bvfhgv8jl8qcl982xlcdjl55l9shlc62hl6kvmsxnbl" https://10.11.141.41/v3/catalogs/?action=refresh
                    """)

            }
            stage('Cleanup') {
                sh("docker rmi ${tag}")
                sh("rm -f ${slug_file}")
                sh "rm -rf *"
                sh "rm -rf .git"
            }
       } catch (err) {
                currentBuild.result = "FAILURE"
                throw err
       }
}