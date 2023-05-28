import { IsString } from 'class-validator';

export class DayDto {
  @IsString()
  currentDate: string;
}
