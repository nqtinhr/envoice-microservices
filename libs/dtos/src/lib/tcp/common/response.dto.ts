import { HTTP_MESSAGE } from '@common/constants/enum/http-message.enum'
import { HttpStatus } from '@nestjs/common'
import { z } from 'zod'

export const ResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    code: z.string().optional().default(HTTP_MESSAGE.OK),
    statusCode: z.number().int().optional().default(HttpStatus.OK),
    data: dataSchema.optional(),
    error: z.string().optional(),
  })

export type ResponseType<T> = {
  code: string
  data?: T
  error?: string
  statusCode: number
}
