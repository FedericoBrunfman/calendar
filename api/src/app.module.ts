import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfficesModule } from './offices/offices.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path';

@Module({
  imports: [
    OfficesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/calendar-malabia'),
    AppointmentsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client/dist'),
    }),
  ]
})
export class AppModule {}
