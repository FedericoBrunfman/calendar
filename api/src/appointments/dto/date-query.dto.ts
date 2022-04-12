import { IsDate, IsOptional, IsString } from "class-validator";

export class DateQuery {
  @IsOptional()
  @IsString()
  startDate: string

  @IsOptional()
  @IsString()
  endDate: string
}