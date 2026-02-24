import { Injectable } from '@nestjs/common'
import { InvoiceRepository } from './invoice.repo'
import { CreateInvoiceTcpRequestType, InvoiceTcpResponseType } from '@common/dtos/tcp/invoice'

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  createInvoice(params: CreateInvoiceTcpRequestType) {
    const data = {
      ...params,
      totalAmount: params.items.reduce((acc, item) => acc + item.total, 0),
      vatAmount: params.items.reduce((acc, item) => acc + item.unitPrice * item.quantity * (item.vatRate / 100), 0),
    }
    return data
  }
}
