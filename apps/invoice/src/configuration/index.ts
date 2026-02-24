import { BaseConfigSchema } from '@common/configuration/base.config'
import { TcpConfigSchema } from '@common/configuration/tcp.config'
import { validateConfig } from '@common/utils/validate.util'
import { config } from 'dotenv'
import { z } from 'zod'

config({
  path: '.env',
})

const InvoiceConfigSchema = z
  .object({
    INVOICE_PORT: z.coerce.number().default(3000),
    INVOICE_DATABASE: z.string(),
    MONGO_MAX_POOL_SIZE: z.coerce.number(),
    MONGO_CONNECT_TIMEOUT_MS: z.coerce.number(),
    MONGO_SOCKET_TIMEOUT_MS: z.coerce.number(),
  })
  .and(BaseConfigSchema)

const invoiceConfig = validateConfig(InvoiceConfigSchema, process.env)
const tcpConfig = validateConfig(TcpConfigSchema, process.env)

export const envConfig = {
  ...invoiceConfig,
  TCP_SERV: tcpConfig,
}
