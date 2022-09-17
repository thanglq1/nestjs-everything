import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { InvoiceRepository } from './invoices.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceSchema, ModelName } from './schemas/invoice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelName, schema: InvoiceSchema }]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoiceRepository],
  exports: [InvoicesService],
})
export class InvoicesModule {}
