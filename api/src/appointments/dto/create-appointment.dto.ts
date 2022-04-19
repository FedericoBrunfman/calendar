import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAppointmentDto {
  @IsString()
  readonly title: string;
  
  @IsString()
  @IsOptional()
  readonly description: string;
  
  @IsNumber()
  readonly extend: number;

  @IsString()
  readonly modules: string;
  
  @IsDate()
  readonly date: Date;
  
  @IsString()
  readonly office: string;
  
  @IsString()
  @IsOptional()
  readonly uuid: string;
}
