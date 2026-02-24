import { createZodDto } from 'nestjs-zod'
import { CreateInvoiceRequestSchema, InvoiceResponseSchema, UpdateInvoiceRequestSchema } from './invoice.model'

export class CreateInvoiceRequestDTO extends createZodDto(CreateInvoiceRequestSchema) {}
export class UpdateInvoiceRequestDTO extends createZodDto(UpdateInvoiceRequestSchema) {}
export class InvoiceResponseDTO extends createZodDto(InvoiceResponseSchema) {}
