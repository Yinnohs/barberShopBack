import { User } from '@prisma/client';

export interface ISchedule {
  id: number;
  barberId: number;
  barber: User;
  service: number[];
  status: boolean;
  ScheduledDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
