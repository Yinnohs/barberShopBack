import { ISchedule } from 'domain/Schedule';
import { IDatabasePartialSelection } from 'src/utils';

export const { select }: IDatabasePartialSelection<ISchedule> = {
  select: {
    id: true,
    barberId: true,
    service: true,
    ScheduledDateTime: true,
    status: true,
  },
};
