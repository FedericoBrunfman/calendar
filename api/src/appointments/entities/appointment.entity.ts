import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import { Office } from 'src/offices/entities/office.entity';

const offices: string[] = [
  '6251e05bfe2169358ec0475d',
  '6251e061fe2169358ec0475f',
  '6251e062fe2169358ec04761',
  '6251e063fe2169358ec04763',
  '6251e064fe2169358ec04765',
  '6251e066fe2169358ec04767',
  '6251e06afe2169358ec04769',
  '6251e074fe2169358ec0476b',
  '6251e078fe2169358ec0476d',
];

@Schema()
export class Appointment extends Document {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Factory((faker) => faker.name.findName())
  @Prop()
  title: string;

  @Factory((faker) => faker.lorem.lines(10))
  @Prop()
  description: string;

  @Factory((faker) =>
    faker.random.arrayElement([
      'Una sola vez',
      'Todas las semanas',
      'Una vez por mes',
    ]),
  )
  @Prop()
  modules: string;

  @Factory((faker) => {
    console.log(faker.date.recent(20), 'faker');
    const date = new Date(faker.date.recent(20)).setMinutes(0);
    console.log('date', date);
    return date;
  })
  @Prop()
  date: Date;

  @Factory((faker) => faker.random.arrayElement(offices))
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Office.name })
  @Type(() => Office)
  office: Office;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
