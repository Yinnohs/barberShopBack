export interface ISchedule {
  id: number;
  barberId: number;
  userId: number;
  service: number[];
  status: boolean;
  ScheduledDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
