import { IsDate, IsEnum, IsNumber, IsString } from "class-validator";

export class CreateAppointmentDto {
  @IsString()
  readonly title: string;
  
  @IsString()
  readonly description: string;
  
  @IsNumber()
  readonly length: number;
  
  @IsDate()
  readonly date: Date;
  
  @IsString()
  readonly office: string;
}
