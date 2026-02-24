import { BaseConfigSchema } from '@common/configuration/base.config'
import { TcpConfigSchema } from '@common/configuration/tcp.config'
import { validateConfig } from '@common/utils/validate.util'
import { config } from 'dotenv'
import { z } from 'zod'

config({
  path: '.env',
})

const ProductConfigSchema = z
  .object({
    PRODUCT_PORT: z.coerce.number().default(3000),
    PRODUCT_DATABASE: z.string(),
  })
  .and(BaseConfigSchema)

const productConfig = validateConfig(ProductConfigSchema, process.env)
const tcpConfig = validateConfig(TcpConfigSchema, process.env)

export const envConfig = {
  ...productConfig,
  TCP_SERV: tcpConfig,
}
