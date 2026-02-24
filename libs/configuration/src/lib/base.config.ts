import { z } from 'zod'

export const BaseConfigSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    GLOBAL_PREFIX: z.string().default('api/v1'),
  })
  .transform((config) => {
    return {
      ...config,
      IS_DEV: config.NODE_ENV === 'development',
    }
  })

export type BaseConfig = z.infer<typeof BaseConfigSchema>
