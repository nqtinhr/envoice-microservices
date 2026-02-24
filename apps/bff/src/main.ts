import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { cleanupOpenApiDoc } from 'nestjs-zod'
import { AppModule } from './app/app.module'
import { envConfig } from './configuration/index'

// declare const module: any;

async function bootstrap() {
  try {
    const port = envConfig.APP_PORT
    const globalPrefix = envConfig.GLOBAL_PREFIX
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    app.setGlobalPrefix(globalPrefix)
    app.useBodyParser('json', { limit: '20mb' })
    app.enableCors({
      origin: '*',
    })

    // if (module.hot) {
    //   module.hot.accept();
    //   module.hot.dispose(() => app.close());
    // }

    const config = new DocumentBuilder()
      .setTitle('Envoice-BFF API')
      .setDescription('The Envoice-BFF API description')
      .setVersion('1.0')
      .addBearerAuth({
        description: 'Default JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
      })
      .build()
    const documentFactory = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup(`${globalPrefix}/docs`, app, cleanupOpenApiDoc(documentFactory), {
      swaggerOptions: {
        persistAuthorization: true,
      },
    })

    await app.listen(port)
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
    Logger.log(`🚀 Swagger is running on: http://localhost:${port}/${globalPrefix}/docs`)
  } catch (error) {
    Logger.error(`❌ Application failed to start: ${error}`, '', 'Bootstrap', false)
  }
}

bootstrap()
