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
      "post-setup": "ls ~/cred;pwd;cp -R ~/cred/secret/ ~/prod/waterloop-website/source/;ls ~/prod/waterloop-website/source/",
      "pre-deploy-local" : "pwd;ls -la",
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js production',
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
};
