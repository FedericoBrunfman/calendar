import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './entities/appointment.entity';
import { OfficesModule } from 'src/offices/offices.module';
import { AppointmentSeed } from './seeds/appointment.seed';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Appointment.name,
        schema: AppointmentSchema,
      },
    ]),
    OfficesModule
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentSeed],
})
export class AppointmentsModule {}
