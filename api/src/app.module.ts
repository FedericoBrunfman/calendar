import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfficesModule } from './offices/offices.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    OfficesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/calendar-malabia'),
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
