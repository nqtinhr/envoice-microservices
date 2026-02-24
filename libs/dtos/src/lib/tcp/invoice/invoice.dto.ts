import { createZodDto } from 'nestjs-zod'
import {
  CreateInvoiceRequestSchema,
  CreateInvoiceRequestType,
  InvoiceResponseSchema,
  InvoiceResponseType,
} from '../../gateway/invoice'

export type CreateInvoiceTcpRequestType = CreateInvoiceRequestType
export type InvoiceTcpResponseType = InvoiceResponseType

export class CreateInvoiceTcpRequestDTO extends createZodDto(CreateInvoiceRequestSchema) {}
export class InvoiceTcpResponseDTO extends createZodDto(InvoiceResponseSchema) {}
