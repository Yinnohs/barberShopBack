import { IsBoolean, IsNumber, IsString, IsOptional } from 'class-validator';
import { IService } from 'domain/Service';

export class updateServiceDto implements Partial<IService> {
  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
