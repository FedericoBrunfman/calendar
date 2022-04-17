import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class OfficeQuery {
  @IsOptional()
  @IsString()
  subsidiary: string;
  
  @IsOptional()
  @IsString()
  name: string;
  
  @IsOptional()
  @IsBoolean()
  populate: boolean;
}
