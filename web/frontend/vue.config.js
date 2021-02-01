const path = require('path')

if (process.env.NODE_ENV === 'development') {
  process.env.VUE_APP_SERVER = 'http://localhost:3003'
}

module.exports = {
  outputDir: path.join(__dirname, '..', 'backend', 'public')
}
