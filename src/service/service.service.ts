import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateServiceDto, updateServiceDto } from './dto';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllServices() {
    const data = await this.prisma.service.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      where: {
        deletedAt: {
          equals: null,
        },
      },
      select: {
        id: true,
        description: true,
        price: true,
      },
    });

    return data;
  }

  async findOneService(id: number) {
    return await this.prisma.service.findFirst({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
    });
  }

  async createService(createServiceData: CreateServiceDto) {
    const service = this.prisma.service.create({ data: createServiceData });
    return service;
  }

  async updateService(id: number, updateServiceData: updateServiceDto) {
    const service = await this.prisma.service.update({
      where: {
        id,
      },
      data: {
        ...updateServiceData,
      },
    });

    if (!service) throw new BadRequestException();

    return service;
  }

  async sofDeleteService(id: number) {
    const currentDate = new Date();

    const service = await this.prisma.service.update({
      where: {
        id,
      },
      data: {
        deletedAt: currentDate,
      },
    });

    if (!service) throw new BadRequestException();

    return service;
  }

  async deleteService(id: number) {
    return await this.prisma.service.delete({
      where: {
        id,
      },
    });
  }
}
