import { TCP_SERVICES } from '@common/constants/enum/tcp.enum'
import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsProviderAsyncOptions, TcpClientOptions, Transport } from '@nestjs/microservices'
import { z } from 'zod'

export const TcpConfigSchema = z
  .object({
    // 1. Invoice
    INVOICE_SERVICE_HOST: z.string(),
    TCP_INVOICE_SERVICE_PORT: z.coerce.number(),

    // 2. Product
    PRODUCT_SERVICE_HOST: z.string(),
    TCP_PRODUCT_SERVICE_PORT: z.coerce.number(),

    // // 3. User Access
    // USER_ACCESS_SERVICE_HOST: z.string(),
    // TCP_USER_ACCESS_SERVICE_PORT: z.coerce.number(),

    // // 4. Authorizer
    // AUTHORIZER_SERVICE_HOST: z.string(),
    // TCP_AUTHORIZER_SERVICE_PORT: z.coerce.number(),

    // // 5. PDF Generator
    // PDF_GENERATOR_SERVICE_HOST: z.string(),
    // TCP_PDF_GENERATOR_SERVICE_PORT: z.coerce.number(),

    // // 6. Media
    // MEDIA_SERVICE_HOST: z.string(),
    // TCP_MEDIA_SERVICE_PORT: z.coerce.number(),
  })
  .transform((env) => {
    // ép kiểu và tạo cấu hình cho từng dịch vụ TCP
    const result = {} as Record<TCP_SERVICES, TcpClientOptions>

    Object.entries(TCP_SERVICES).forEach(([key, serviceName]) => {
      const hostKey = `${key}_HOST`
      const portKey = `${serviceName}_PORT`

      const typedEnv = env as Record<string, string | number>

      const config: TcpClientOptions = {
        transport: Transport.TCP,
        options: {
          host: typedEnv[hostKey] as string,
          port: typedEnv[portKey] as number,
        },
      }

      result[serviceName] = config
    })

    return result
  })

export type TcpConfig = z.infer<typeof TcpConfigSchema>

export const TcpProvider = (serviceName: keyof TcpConfig): ClientsProviderAsyncOptions => {
  return {
    name: serviceName,
    useFactory: () => {
      // return configService.get(`TCP_SERV.${serviceName}`) as TcpClientOptions

      const tcpConfig = TcpConfigSchema.parse(process.env)
      const clientOptions = tcpConfig[serviceName] as TcpClientOptions

      if (!clientOptions) {
        throw new Error(`[TcpProvider] Configuration for '${serviceName}' not found.`)
      }

      return clientOptions
    },
  }
  // const client = ClientProxyFactory.create(option);
  // return createTracingClientProxy(client);
}
