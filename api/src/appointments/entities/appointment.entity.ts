import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { Office } from 'src/offices/entities/office.entity';

@Schema()
export class Appointment extends Document {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  startTime: string;

  @Prop()
  endTime: string;
  
  @Prop()
  date: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Office.name })
  @Type(() => Office)
  office: Office;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
