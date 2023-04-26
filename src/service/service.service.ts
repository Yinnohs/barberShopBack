import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateServiceDto, updateServiceDto } from './dto';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllServices(skip = 0, take = 10) {
    const currentPage = skip + 1;
    const servicesCount = await this.prisma.service.count();
    const totalPages = Math.floor(servicesCount / take) || 1;
    const data = await this.prisma.service.findMany({
      skip,
      take,
      orderBy: {
        updatedAt: 'desc',
      },
      where: {
        deletedAt: {
          equals: null,
        },
      },
    });

    return {
      limit: take,
      page: currentPage,
      lastPage: totalPages,
      data,
    };
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
