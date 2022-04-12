import { IsOptional } from 'class-validator';

export class OfficeQuery {
  @IsOptional()
  subsidiary: string;
  
  @IsOptional()
  name: string;
}
