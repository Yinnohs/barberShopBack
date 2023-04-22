import { IUser } from '../../../domain';

export class UserInformationDto implements Partial<IUser> {
  id: number;
  email: string;
  name: string;
  surname: string;
  schedules: string[];
}
