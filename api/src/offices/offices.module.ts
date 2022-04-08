import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/events/entities/event.entity';
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
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
  ],
  controllers: [OfficesController],
  providers: [OfficesService],
  exports: [OfficesService]
})
export class OfficesModule {}
