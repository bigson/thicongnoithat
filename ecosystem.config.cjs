module.exports = {
  apps : [{
    name: 'Thi-Cong-Tot',
    script: 'server.js',
    instances: 2, // default 1
    autorestart: true,
    exec_mode: 'cluster'
  }],
  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
