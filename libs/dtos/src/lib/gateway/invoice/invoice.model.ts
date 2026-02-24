import { INVOICE_STATUS } from '@common/constants/enum/invoice.enum'
import z from 'zod'

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId')

export const ClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().optional(),
})

export const InvoiceItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  quantity: z.number().min(1),
  unitPrice: z.number().min(0),
  vatRate: z.number().min(0),
  total: z.number().min(0),
})

export const CreateInvoiceRequestSchema = z.object({
  client: ClientSchema,
  items: z.array(InvoiceItemSchema).min(1, 'Hóa đơn phải có ít nhất 1 sản phẩm'),
})

export const UpdateInvoiceRequestSchema = CreateInvoiceRequestSchema.partial()

export const InvoiceResponseSchema = CreateInvoiceRequestSchema.extend({
  id: objectIdSchema,
  totalAmount: z.number().min(0),
  vatAmount: z.number().min(0),
  status: z.enum(INVOICE_STATUS),
  supervisorId: objectIdSchema.optional().nullable(),
  fileUrl: z.string().url().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export type CreateInvoiceRequestType = z.infer<typeof CreateInvoiceRequestSchema>
export type UpdateInvoiceRequestType = z.infer<typeof UpdateInvoiceRequestSchema>
export type InvoiceResponseType = z.infer<typeof InvoiceResponseSchema>
