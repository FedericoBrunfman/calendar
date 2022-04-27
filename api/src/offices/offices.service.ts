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
import { UpdateOfficeDto } from './dto/update-office.dto';
import { Office } from './entities/office.entity';
import { OfficeQuery } from './dto/office-query.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OfficesService {
  constructor(
    @InjectModel(Office.name) private readonly officeModel: Model<Office>,
    private readonly prismaService: PrismaService,
  ) {}

  findAll(paginationQuery: PaginationQueryDto, officeQuery: OfficeQuery) {
    const { limit, offset } = paginationQuery;
    const { subsidiary, name, populate } = officeQuery;
    const query: any = {};
    if (subsidiary) query.subsidiary = { $eq: subsidiary };
    if (name) query.name = { $eq: name };

    let officeModel = this.officeModel.find(query).skip(offset).limit(limit);
    if (populate)
      officeModel.populate({
        path: populate ? 'appointments' : '',
      });
    return officeModel.exec();
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
    // const office = new this.officeModel(createOfficeDto);
    // return office.save();
    return this.prismaService.office.create({
      data: createOfficeDto,
    });
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
