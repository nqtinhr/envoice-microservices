import { MetadataKeys } from '@common/constants/common.constant'
import { HTTP_MESSAGE } from '@common/constants/enum/http-message.enum'
import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Reflector } from '@nestjs/core' // 1. Cần import Reflector
import { ZodSerializerInterceptor } from 'nestjs-zod' // 2. Import Zod Interceptor
import { Request } from 'express'
import { catchError, map, Observable } from 'rxjs'

@Injectable()
export class ExceptionInterceptor extends ZodSerializerInterceptor {
  private readonly logger = new Logger(ExceptionInterceptor.name)

  constructor(protected readonly reflector: Reflector) {
    super(reflector)
  }

  override intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const ctx = context.switchToHttp()
    const request: Request & { [MetadataKeys.PROCESS_ID]: string; [MetadataKeys.START_TIME]: number } = ctx.getRequest()

    const startTime = request[MetadataKeys.START_TIME] || Date.now()

    // Việc này để Zod thực hiện serialize dữ liệu trước, sau đó trả về observable
    return super.intercept(context, next).pipe(
      map((data: any) => {
        const durationMs = Date.now() - startTime

        if (data && typeof data === 'object' && !Array.isArray(data)) {
          data.duration = `${durationMs} ms`
          return data
        } else if (Array.isArray(data)) {
          return {
            data,
            duration: `${durationMs} ms`,
          }
        }

        return data
      }),
      catchError((error) => {
        this.logger.error({ error })

        const durationMs = Date.now() - startTime

        const message = error?.response?.message || error?.message || error || HTTP_MESSAGE.INTERNAL_SERVER_ERROR

        const code =
          error?.status || error?.statusCode || error?.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR

        const response = error.getResponse ? error.getResponse() : error.response
        const data = response && typeof response === 'object' ? { ...response } : response

        const payload = {
          message,
          statusCode: code,
          data: typeof data === 'object' ? data : { error: data },
          duration: `${durationMs} ms`,
        }

        if (payload.data && typeof payload.data === 'object') {
          delete (payload.data as any).message
          delete (payload.data as any).statusCode
        }

        throw new HttpException(payload, Number(code) || HttpStatus.INTERNAL_SERVER_ERROR)
      }),
    )
  }
}
