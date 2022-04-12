import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
import { Subsidiary } from '../offices.enum';

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Office extends Document {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  subsidiary: Subsidiary;
}

const OfficeSchema = SchemaFactory.createForClass(Office);

OfficeSchema.virtual('appointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'office',
});

export { OfficeSchema };
