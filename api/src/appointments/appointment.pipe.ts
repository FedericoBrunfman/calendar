import { ArgumentMetadata } from '@nestjs/common';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AppointmentPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    return value;
  }
}
