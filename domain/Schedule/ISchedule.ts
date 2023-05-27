export interface ISchedule {
  id: number;
  barberId: number;
  userId: number;
  service: number[];
  status: boolean;
  scheduledDateTime: Date | string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
