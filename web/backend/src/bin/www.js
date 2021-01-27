/* eslint-disable no-fallthrough */
import '../module-alias'
/**
 * Module dependencies.
 */
import http from 'http'
import app from '@/app'
import logger from '@/core/logger'

import initMysql from '@/core/mysql/init'

/**
 * Get port from environment and store in Express.
 */
const port = process.env.SERVER_PORT || 3003
app.set('port', port)

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Event listener for HTTP server "error" event.
 */
function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening () {
  logger.info(`Listening on http://localhost:${port}`)
}

/**
 * Listen on provided port, on all network interfaces.
 */
async function main () {
  await initMysql()
  server.on('error', onError)
  server.on('listening', onListening)
  server.listen(port)
}

main()
