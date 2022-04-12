import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seeder, DataFactory } from "nestjs-seeder";
import { Appointment } from "./entities/appointment.entity";
 
@Injectable()
export class AppointmentSeeder implements Seeder {
  constructor(@InjectModel(Appointment.name) private readonly appointment: Model<Appointment>) {}
 
  async seed(): Promise<any> {
    // Generate 100 appointments.
    const appointments = DataFactory.createForClass(Appointment).generate(100);
 
    // Insert into the database.
    return this.appointment.insertMany(appointments);
  }
 
  async drop(): Promise<any> {
    return this.appointment.deleteMany({});
  }
}