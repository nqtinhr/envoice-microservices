import { ExceptionInterceptor } from '@common/interceptors/exception.interceptor'
import { LoggerMiddleware } from '@common/middlewares/logger.middleware'
import { CustomZodValidationPipe } from '@common/pipes/custom-zod-validation.pipe'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { InvoiceModule } from './modules/invoice/invoice.module'

@Module({
  imports: [InvoiceModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: CustomZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
