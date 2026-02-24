import { UnprocessableEntityException } from '@nestjs/common'
import { createZodValidationPipe, ZodValidationPipe } from 'nestjs-zod'
import { ZodError } from 'zod'

export const CustomZodValidationPipe: typeof ZodValidationPipe = createZodValidationPipe({
  // provide custom validation exception factory
  createValidationException: (error: any) => {
    const zodError = error as ZodError
    console.log(zodError)
    return new UnprocessableEntityException(
      zodError.issues.map((issue) => {
        return {
          ...issue,
          path: issue.path.join('.'),
        }
      }),
    )
  },
})

