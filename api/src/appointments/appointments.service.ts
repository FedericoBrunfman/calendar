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

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,
    private readonly datesService: DatesService,
  ) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    const appointment = new this.appointmentModel(createAppointmentDto);
    return appointment.save();
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
