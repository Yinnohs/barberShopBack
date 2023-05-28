import { OmitDates } from 'domain/utils';
import { ISchedule } from 'domain/Schedule';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateScheduleDto
  implements
    OmitDates<Omit<ISchedule, 'id' | 'status' | 'updatedAt' | 'userId'>>
{
  @IsNumber()
  public barberId: number;

  @IsArray()
  public service: number[];

  @IsString()
  public scheduledDateTime: Date | string;
}
