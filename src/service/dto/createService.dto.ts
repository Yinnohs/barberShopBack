import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';
import { IService } from 'domain/Service';

export class CreateServiceDto implements Partial<IService> {
  @IsString()
  @Length(5, 150)
  description: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  isActive: boolean;
}
