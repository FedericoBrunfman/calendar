import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateOfficeDto } from './dto/create-office.dto';
import { Event } from 'src/events/entities/event.entity';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { Office } from './entities/office.entity';
import { OfficeQuery } from './dto/office-query.dto';

@Injectable()
export class OfficesService {
  constructor(
    @InjectModel(Office.name) private readonly officeModel: Model<Office>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto, officeQuery: OfficeQuery) {
    const { limit, offset } = paginationQuery;
    const { subsidiary, name } = officeQuery;
    const query: any = {}
    if (subsidiary) query.subsidiary = { $eq: subsidiary }
    if (name) query.name = { $eq: name }
    return this.officeModel
      .find(query)
      .skip(offset)
      .limit(limit)
      .populate({
        path: 'appointments',
      })
      .exec();
  }

  findOne(id: string) {
    const office = this.officeModel
      .findOne({ _id: id })
      .populate({
        path: 'appointments',
      })
      .exec();
    if (!office) {
      throw new HttpException(`Office ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return office;
  }

  create(createOfficeDto: CreateOfficeDto) {
    const office = new this.officeModel(createOfficeDto);
    return office.save();
  }

  async update(id: string, updateOfficeDto: UpdateOfficeDto) {
    const existingOffice = await this.officeModel
      .findOneAndUpdate({ _id: id }, { $set: updateOfficeDto }, { new: true })
      .exec();

    if (!existingOffice) throw new NotFoundException(`Office #${id} not found`);
  }

  async remove(id: string) {
    const office = await this.findOne(id);
    return office.remove();
  }
}
