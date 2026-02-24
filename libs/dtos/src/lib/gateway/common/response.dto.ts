import { HTTP_MESSAGE } from '@common/constants/enum/http-message.enum'
import { HttpStatus } from '@nestjs/common'
import { z } from 'zod'

export const ResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    message: z.string().default(HTTP_MESSAGE.OK),
    data: dataSchema.optional(),
    statusCode: z.number().int().default(HttpStatus.OK),
    processId: z.string().optional(),
  })

export type ResponseType<T> = {
  message: string
  data?: T
  processId?: string
  statusCode: number
}
