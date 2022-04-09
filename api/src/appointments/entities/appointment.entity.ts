import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import { Office } from 'src/offices/entities/office.entity';
import { Subsidiary } from '../appointments.enum';

@Schema()
export class Appointment extends Document {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Factory((faker) => faker.name.findName())
  @Prop()
  title: string;

  @Factory((faker) => faker.lorem.paragraph(4))
  @Prop()
  description: string;

  @Factory('30')
  @Prop()
  length: number;

  @Factory((faker) => faker.random.arrayElement(['Malabia', 'Mario Bravo']))
  @Prop()
  subsidiary: Subsidiary;

  @Factory((faker) => faker.date.past())
  @Prop()
  date: Date;

  @Factory('624db2a93c238b875e9de388')
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Office.name })
  @Type(() => Office)
  office: Office;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
