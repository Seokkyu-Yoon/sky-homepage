module.exports = {
  outputDir: `${__dirname}/web/backend/public/`,
  pages: {
    app: {
      entry: 'web/frontend/src/main.js',
      template: 'web/frontend/public/index.html',
      filename: 'index.html'
    },
  }
}