import { IService } from 'domain/Service';

export class updateServiceDto implements Partial<IService> {
  description?: string;
  price?: number;
  isActive?: boolean;
}
