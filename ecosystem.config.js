module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'prod-web',
      script    : 'bin/www',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },

    // Second application
    // {
    //  name      : 'WEB',
    //  script    : 'web.js'
    //}
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'ec2-user',
      host : '35.169.104.186',
      ref  : 'origin/master',
      key  : '~/.ssh/instance-key.pem',
      repo : 'git@github.com:waterloop/waterloop-website.git',
      path : '/home/ec2-user/prod/waterloop-website',
      "post-setup": "cp -R ~/cred/secret/ ~/prod/waterloop-website/source/;ls ~/prod/waterloop-website/source/",
      "pre-deploy-local" : "pwd;ls -la",
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js production',
      "env"  : {
        "NODE_ENV": "production"
      }
   }
//    dev : {
//      user : 'node',
//      host : '212.83.163.1',
//      ref  : 'origin/master',
//      repo : 'git@github.com:repo.git',
//      path : '/var/www/development',
//      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
//      env  : {
//        NODE_ENV: 'dev'
//      }
//    }
  }
};
