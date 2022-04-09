import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Appointment,
  AppointmentSchema,
} from './appointments/entities/appointment.entity';
import { AppointmentSeeder } from './appointments/appointments.seeder';

seeder({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/calendar-malabia'),
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
  ],
}).run([AppointmentSeeder]);
