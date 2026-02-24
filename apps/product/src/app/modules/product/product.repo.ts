import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // create(data: any) {
  //   return this.prismaService.product.
  // }
}
