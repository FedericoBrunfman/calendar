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

@Injectable()
export class OfficesService {
  constructor(
    @InjectModel(Office.name) private readonly officeModel: Model<Office>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.officeModel.find().skip(offset).limit(limit).exec();
  }

  findOne(id: string) {
    const office = this.officeModel.findOne({ _id: id }).exec();
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
