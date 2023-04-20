import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SingUpDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 25, {
    message: 'La contraseña debe tener entre de 8 a 25 carácteres',
  })
  public password: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;
}
