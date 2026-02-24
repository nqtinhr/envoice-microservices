import { TcpProvider } from '@common/configuration/tcp.config';
import { TCP_SERVICES } from '@common/constants/enum/tcp.enum';
import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { ClientsModule } from '@nestjs/microservices';


@Module({
  imports: [
    ClientsModule.registerAsync([
      TcpProvider(TCP_SERVICES.INVOICE_SERVICE),
    ]),
  ],
  controllers: [InvoiceController],
  providers: [],
  exports: [],
})
export class InvoiceModule {}
