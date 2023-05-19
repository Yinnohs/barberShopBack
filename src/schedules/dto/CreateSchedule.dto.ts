import { OmitDates } from 'domain/utils';
import { ISchedule } from 'domain/Schedule';

export class CreateSchaduleDto
  implements OmitDates<Omit<ISchedule, 'id' | 'status'>>
{
  public barberId: number;
  public service: number[];
  public ScheduledDateTime: Date;
  public updatedAt: Date;
  public userId: number;
}
