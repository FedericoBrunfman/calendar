import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { Model } from 'mongoose';
import { DateQuery } from './dto/date-query.dto';
import { DatesService } from 'src/common/dates/dates.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment, any>,
    private readonly datesService: DatesService,
    private readonly prismaService: PrismaService,
  ) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    const appoinments = this.datesService.extendDates(createAppointmentDto);
    // console.log(appoinments, 'appointments')
    return this.appointmentModel.insertMany(appoinments);
    // return this.prismaService.appointment.createMany({ data: appoinments });
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    const appointments = this.appointmentModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('office')
      .exec();

    return appointments;
  }

  findOne(id: string) {
    const appointment = this.appointmentModel.findOne({ _id: id }).exec();
    if (!appointment) {
      throw new HttpException(
        `Appointment ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const existingAppoimtment = await this.appointmentModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateAppointmentDto },
        { new: true },
      )
      .exec();

    if (!existingAppoimtment)
      throw new NotFoundException(`Appointment #${id} not found`);
  }

  async remove(id: string) {
    const appointment = await this.findOne(id);
    return appointment.remove();
  }

  async removeMany(uuid: string) {
    return await this.appointmentModel.deleteMany({ uuid });
  }

  async removeByDay(uuid: string, date: string) {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return await this.appointmentModel.deleteMany({
      uuid,
      date: {
        $gte: new Date(date).toISOString(),
        $lt: new Date(nextDay).toISOString(),
      },
    });
  }

  async findManyByDate(dateQuery: DateQuery) {
    const { startDate, endDate } = dateQuery;

    const appointments = await this.appointmentModel
      .find({
        date: {
          $gte: new Date(startDate).toISOString(),
          $lt: new Date(endDate).toISOString(),
        },
      })
      .populate('office')
      .exec();
    return this.datesService.formatDates(appointments);
  }
}
