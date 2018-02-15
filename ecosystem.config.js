module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'web',
      script    : 'bin/www',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ],

  deploy : {
    production : {
      user : 'ec2-user',
      host : '35.169.104.186',
      ref  : 'origin/master',
      key  : '~/.ssh/instance-key.pem',
      repo : 'git@github.com:waterloop/waterloop-website.git',
      path : '/home/ec2-user/prod/waterloop-website',
      "post-setup": "echo #######Post Setup#######",
      "pre-deploy-local" : "#########Pre-Deploy-Local#############;pwd;cp -R ~/cred/secret/ ~/prod/waterloop-website/;ls ~/prod/waterloop-website/source/",
      'post-deploy' : 'pwd;cp -R ~/cred/secret/ ~/prod/waterloop-website/;ls ~/prod/waterloop-website/source/;npm install && pm2 startOrRestart ecosystem.config.js production',
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
};
