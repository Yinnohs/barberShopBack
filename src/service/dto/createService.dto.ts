import { IsBoolean, IsDecimal, IsString, Length } from 'class-validator';
import { IService } from 'domain/Service';

export class CreateServiceDto implements Partial<IService> {
  @IsString()
  @Length(20, 150)
  description: string;

  @IsDecimal()
  price: number;

  @IsBoolean()
  isActive: boolean;
}
