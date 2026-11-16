import { betterAuth } from 'better-auth'
import { MongoClient } from 'mongodb'
import { mongodbAdapter } from '@better-auth/mongo-adapter'
import { admin } from 'better-auth/plugins'
const client = new MongoClient(process.env.MONGODB_URI as string)
const db = client.db('hire-loop')

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
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
  plugins: [admin()],
  database: mongodbAdapter(db, {
    client,
  }),
})
