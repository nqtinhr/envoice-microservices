import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { MetadataKeys } from '@common/constants/common.constant'

/**
Mục tiêu Logger Middleware:
- Log request (method, path, body, params) dựa vào đó để trace log
- Log response cho client cần in một số thông tin: method, path, status code, đo lường thời gian tốn bao nhiêu để xử lý request
*/

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now()
    const { method, originalUrl, body } = req
    const now = Date.now()

    ;(req as any)[MetadataKeys.START_TIME] = startTime

    Logger.log(
      `HTTP >> Start process >> path: '${originalUrl}' >> method: '${method}' at '${now}' >> input: ${JSON.stringify(
        body,
      )}`,
    )

    const originalSend = res.send.bind(res)

    // Override để do thời gian xử lý request
    res.send = (body: any) => {
      const durationMs = Date.now() - startTime
      Logger.log(
        `HTTP >> End process >> path: '${originalUrl}' >> method: '${method}' at '${now}' >> duration: ${durationMs} ms`,
      )

      return originalSend(body)
    }
    next()
  }
}
