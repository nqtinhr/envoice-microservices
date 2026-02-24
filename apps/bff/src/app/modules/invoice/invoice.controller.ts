import { TCP_REQUEST_MESSAGE, TCP_SERVICES } from '@common/constants/enum/tcp.enum'
import { ProcessId } from '@common/decorators/processId.decorator'
import { CreateInvoiceRequestDTO, InvoiceResponseDTO } from '@common/dtos/gateway/invoice'
import { CreateInvoiceTcpRequestType, InvoiceTcpResponseType } from '@common/dtos/tcp/invoice'
import { TcpClient } from '@common/interfaces/tcp-client.interface'
import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ZodResponse } from 'nestjs-zod'
import { map } from 'rxjs'

@ApiTags('Invoice')
@Controller('invoices')
export class InvoiceController {
  constructor(@Inject(TCP_SERVICES.INVOICE_SERVICE) private readonly invoiceClient: TcpClient) {}

  @Post()
  // @ZodResponse({ type: InvoiceResponseDTO })
  create(@Body() body: CreateInvoiceRequestDTO, @ProcessId() processId: string) {
    return this.invoiceClient
      .send<InvoiceTcpResponseType, CreateInvoiceTcpRequestType>(TCP_REQUEST_MESSAGE.INVOICE.CREATE, {
        data: body,
        processId,
      })
      .pipe(
        map((data) => {
          console.log(data)
          return data
        }),
      )
  }
}
