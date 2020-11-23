import { connect } from 'mongoose'
import { DbConnectionError } from '@bigoncloud/errors'
import { logger } from '@bigoncloud/logger'

import { DB_URI } from '../config'

async function startDatabase() {
  if (!DB_URI) {
    throw new DbConnectionError(
      'Database URI connection string must be provided!',
    )
  }

  try {
    await connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
  } catch (err) {
    throw new DbConnectionError(err)
  }
}

startDatabase()
  .then(() => logger.info('Database connection successfull!'))
  .catch((err) => logger.error(err))