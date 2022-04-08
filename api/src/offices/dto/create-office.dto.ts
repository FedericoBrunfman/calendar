import { IsEnum, IsString } from 'class-validator';
import { Subsidiary } from '../office.enum';

export class CreateOfficeDto {
  @IsString()
  readonly name: string;
  
  @IsString()
  @IsEnum(Subsidiary)
  readonly subsidiary: string;

  // @IsString()
  // readonly brand: string;

  // @IsString({ each: true })
  // readonly flavors: string[];
}
