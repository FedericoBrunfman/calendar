import { IsDate, IsEnum, IsNumber, IsString } from "class-validator";

export class CreateAppointmentDto {
  @IsString()
  readonly title: string;
  
  @IsString()
  readonly description: string;
  
  @IsString()
  readonly modules: string;
  
  @IsDate()
  readonly date: Date;
  
  @IsString()
  readonly office: string;
}
