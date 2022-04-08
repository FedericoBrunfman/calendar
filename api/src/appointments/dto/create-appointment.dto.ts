import { IsString } from "class-validator";

export class CreateAppointmentDto {
  @IsString()
  readonly title: string;
  
  @IsString()
  readonly description: string;
  
  @IsString()
  readonly startTime: string;

  @IsString()
  readonly endTime: string;
  
  @IsString()
  readonly date: string;
  
  @IsString()
  readonly office: string;
}
