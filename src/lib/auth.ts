import { betterAuth } from 'better-auth'
import { MongoClient } from 'mongodb'
import { mongodbAdapter } from '@better-auth/mongo-adapter'

const client = new MongoClient(process.env.MONGODB_URI as string)
const db = client.db('hire-loop')

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'seeker',
        input: true,
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
})
