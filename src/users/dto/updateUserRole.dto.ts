import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Role } from 'src/common';

export class UpdateUserRoleDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  role: Role;
}
