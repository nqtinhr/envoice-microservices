import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { envConfig } from '../configuration'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name)

  constructor() {
    const databaseUrl = new URL(envConfig.INVOICE_DATABASE)

    databaseUrl.searchParams.set('maxPoolSize', envConfig.MONGO_MAX_POOL_SIZE.toString())
    databaseUrl.searchParams.set('connectTimeoutMS', envConfig.MONGO_CONNECT_TIMEOUT_MS.toString())
    databaseUrl.searchParams.set('socketTimeoutMS', envConfig.MONGO_SOCKET_TIMEOUT_MS.toString())

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
      this.logger.log(`Prisma Connected to Mongo [Pool: ${envConfig.MONGO_MAX_POOL_SIZE}]`)
    } catch (error) {
      this.logger.error('Prisma Connection Failed', error)
      throw error
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
    this.logger.log('Prisma Disconnected')
  }
}
