import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { envConfig } from './configuration'

async function bootstrap() {
  const port = envConfig.PRODUCT_PORT
  const globalPrefix = envConfig.GLOBAL_PREFIX
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: envConfig.TCP_SERV.TCP_PRODUCT_SERVICE.options.host,
      port: envConfig.TCP_SERV.TCP_PRODUCT_SERVICE.options.port,
    },
  })

  app.setGlobalPrefix(globalPrefix)

  await app.startAllMicroservices()
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

bootstrap()
