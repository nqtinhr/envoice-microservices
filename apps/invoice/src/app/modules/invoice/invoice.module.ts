import { Module } from '@nestjs/common'
import { InvoiceController } from './invoice.controller'
import { InvoiceService } from './invoice.service'
import { InvoiceRepository } from './invoice.repo'
import { PrismaService } from '../../prisma.service'

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceRepository, PrismaService],
})
export class InvoiceModule {}
