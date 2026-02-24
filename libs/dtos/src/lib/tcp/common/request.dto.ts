import { z } from 'zod'

export const RequestSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z
    .object({
      data: dataSchema.optional(),
      processId: z.string(),
    })
    .strict()

export type RequestType<T> = {
  data?: T
  processId: string
}
