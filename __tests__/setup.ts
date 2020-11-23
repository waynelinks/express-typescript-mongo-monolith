import { MongoMemoryServer } from 'mongodb-memory-server'
import { connect, connection } from 'mongoose'

let mongo: MongoMemoryServer
beforeAll(async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()

  await connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

beforeEach(async () => {
  const collections = await connection.db.collections()

  collections.map((collection) => collection.deleteMany({}))
})

afterAll(async () => {
  await mongo.stop()
  await connection.close()
})
