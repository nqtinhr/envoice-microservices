import { defineConfig, env } from 'prisma/config'
import { config } from 'dotenv'
import path from 'path'

config({ path: path.resolve(__dirname, '../../.env') })

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: env('PRODUCT_DATABASE'),
  },
})
