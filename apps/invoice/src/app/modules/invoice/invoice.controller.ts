import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp.enum'
import { RequestParams } from '@common/decorators/request-params.decorator'
import { CreateInvoiceTcpRequestDTO, InvoiceTcpResponseDTO } from '@common/dtos/tcp/invoice'
import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { InvoiceService } from './invoice.service'

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.CREATE)
  async createInvoice(@RequestParams() params: CreateInvoiceTcpRequestDTO) {
    const result = await this.invoiceService.createInvoice(params)
    return result
  }
}
