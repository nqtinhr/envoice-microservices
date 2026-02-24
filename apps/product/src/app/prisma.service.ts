import { PrismaClient } from '../generated/prisma/client'
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { envConfig } from '../configuration'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name)

  constructor() {
    const databaseUrl = new URL(envConfig.PRODUCT_DATABASE)

    super({
      datasources: {
        db: {
          url: databaseUrl.toString(),
        },
      },
      log: envConfig.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  }

  async onModuleInit() {
    try {
      await this.$connect()
      this.logger.log(`✅ Prisma Connected to PostgreSQL`)
    } catch (error) {
      this.logger.error('❌ Prisma Connection Failed', error)
      throw error
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
    this.logger.log('🛑 Prisma Disconnected')
  }
}
