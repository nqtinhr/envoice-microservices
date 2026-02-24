import { Injectable } from '@nestjs/common'
import { Invoice } from '@prisma/client'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class InvoiceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getById(id: string) {
    return this.prismaService.invoice.findUnique({
      where: { id },
    })
  }

  create(data: Partial<Invoice>) {
    return this.prismaService.invoice.create({
      data: data as any,
    })
  }

  update(id: string, data: Partial<Invoice>) {
    return this.prismaService.invoice.update({
      where: { id },
      data,
    })
  }
}
