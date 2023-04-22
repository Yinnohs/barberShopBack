import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { IUser, OmitDates } from '../../../domain';

export class UpdateUserDto
  implements Partial<Omit<OmitDates<IUser>, 'id' | 'hashedRt' | 'schedules'>>
{
  @IsOptional()
  @IsEmail()
  @IsString()
  public email?: string;

  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  @Length(8, 25, {
    message: 'La contraseña debe tener entre de 8 a 25 carácteres',
  })
  public password?: string;

  @IsOptional()
  @IsString()
  public surname?: string;
}
