import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSchaduleDto } from './dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllSchedules(skip: number, take: number) {
    const currentPage = skip + 1;
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
      skip: currentPage,
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

  async findAllUserSchedules(userId: number) {
    return await this.prisma.schedule.findMany({
      where: {
        userId,
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

  async createSchedule(createScheduleData: CreateSchaduleDto) {
    const schedule = this.prisma.schedule.create({
      data: {
        status: true,
        userId: createScheduleData.userId,
        barberId: createScheduleData.barberId,
        ScheduledDateTime: createScheduleData.ScheduledDateTime,
        service: {
          connect: createScheduleData.service.map((id) => {
            return { id };
          }),
        },
      },
    });

    return schedule;
  }
}
