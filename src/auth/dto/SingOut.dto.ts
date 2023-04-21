import { IsNotEmpty } from 'class-validator';

export class SingOutDto {
  @IsNotEmpty()
  access_token: string;
}
