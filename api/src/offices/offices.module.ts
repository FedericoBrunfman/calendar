import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Office, OfficeSchema } from './entities/office.entity';
import { OfficesController } from './offices.controller';
import { OfficesService } from './offices.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Office.name,
        schema: OfficeSchema,
      },
    ]),
    PrismaModule
  ],
  controllers: [OfficesController],
  providers: [OfficesService],
  exports: [OfficesService],
})
export class OfficesModule {}
