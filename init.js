const fs = require('fs')
const path = require('path')

function mkdir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }
}

const pathStorage = path.join(__dirname, 'storage')
mkdir(pathStorage)