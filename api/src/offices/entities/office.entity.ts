import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
// import { Type } from 'class-transformer';
// import mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { Subsidiary } from '../office.enum';

@Schema()
export class Office extends Document {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  subsidiary: Subsidiary

  // @Prop()
  // brand: string;

  // @Prop({ default: 0 })
  // recommendations: number;

  // @Prop([String])
  // flavors: string[];

  // @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Appointment.name })
  // @Type(() => Appointment)
  // appointments: Appointment[];
}

export const OfficeSchema = SchemaFactory.createForClass(Office);
