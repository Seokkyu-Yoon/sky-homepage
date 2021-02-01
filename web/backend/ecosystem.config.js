module.exports = {
  apps: [
    {
      name: 'server',
      script: './dist/bin/www.js',
      instances: 0,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'distribute',
        MYSQL_IP: 'localhost',
        MYSQL_PORT: 3001,
        MYSQL_DATABASE: 'homepage'
      }
    }
  ]
}
