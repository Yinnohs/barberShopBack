export interface IUser {
  id: number;
  email: string;
  name: string;
  surname: string;
  password: string;
  hashedRt?: string;
  schedules: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
