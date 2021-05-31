module.exports = {
  apps : [{
    script: 'app/index.js',
    watch: '.',
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]

};
