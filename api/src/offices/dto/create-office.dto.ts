import { IsEnum, IsString } from 'class-validator';
import { Subsidiary } from '../offices.enum';

export class CreateOfficeDto {
  @IsString()
  readonly name: string;

  @IsEnum(Subsidiary)
  readonly subsidiary: string;
}
