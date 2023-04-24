import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { select } from './utils';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllSchedules(skip: number, take: number) {
    return await this.prisma.schedule.findMany({
      where: {
        deletedAt: {
          equals: null,
        },
      },
      include: {
        barber: true,
        service: true,
      },
      skip,
      take,
    });
  }

  async findAllBarberSchedules(barberId: number) {
    return await this.prisma.schedule.findMany({
      where: {
        barberId,
      },
      include: {
        barber: true,
        service: true,
      },
    });
  }

  async findOneSchedule(id: number) {
    const schedule = await this.prisma.schedule.findFirst({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        barber: true,
        service: true,
      },
    });

    if (!schedule) throw new BadRequestException();

    return schedule;
  }

  async deleteSchedule(id: number) {
    return await this.prisma.schedule.delete({ where: { id } });
  }

  async softDeleteSchedule(id: number) {
    const currentDate = new Date();
    const schedule = await this.prisma.schedule.update({
      where: { id },
      data: { deletedAt: currentDate },
    });

    if (!schedule) throw new BadRequestException();

    return schedule;
  }
}
