import { BaseConfigSchema } from '@common/configuration/base.config';
import { TcpConfigSchema } from '@common/configuration/tcp.config';
import { validateConfig } from '@common/utils/validate.util';
import { config } from 'dotenv';
import { z } from 'zod';

config({
  path: '.env',
})

const BffConfigSchema = z
  .object({
    APP_PORT: z.coerce.number(),
  })
  .and(BaseConfigSchema)


const bffConfig = validateConfig(BffConfigSchema, process.env)
const tcpConfig = validateConfig(TcpConfigSchema, process.env)

export const envConfig = {
  ...bffConfig,
  TCP_SERV: tcpConfig,
}
