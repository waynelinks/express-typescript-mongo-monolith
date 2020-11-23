import { createServer } from 'http'
import { logger } from '@bigoncloud/logger'
import { ServerError } from '@bigoncloud/errors'

import './db'
import { app } from './app'
import { ACCESS_TOKEN_SECRET, NODE_ENV, PORT } from './config'

if (!ACCESS_TOKEN_SECRET) {
  throw new ServerError('ACCESS_TOKEN_SECRET is not set!')
}

const port = PORT || 3001
const server = createServer(app)

async function startServer() {
  try {
    await server.listen(port)
  } catch (err) {
    throw new ServerError(err.message)
  }
}

startServer()
  .then(() => logger.info(`Server running on port: ${port} env: ${NODE_ENV}`))
  .catch((err) => logger.error(err))
