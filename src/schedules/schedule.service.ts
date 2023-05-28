import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateScheduleDto } from './dto';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('momentWrapper') moment: moment.Moment,
  ) {}

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
        AND: {
          deletedAt: {
            equals: null,
          },
        },
      },
      include: {
        barber: true,
        service: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAllBarberTakenSlotByDay(barberId: number, currentDate: string) {
    const currentDateTimeSlots = this.getTimeSlotArray(currentDate);

    const takenSlots = await this.prisma.schedule.findMany({
      where: {
        barberId,
        AND: {
          deletedAt: {
            equals: null,
          },
          ScheduledDateTime: {
            in: currentDateTimeSlots,
          },
        },
      },
      select: {
        ScheduledDateTime: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return takenSlots;
  }

  async findAllUserSchedules(id: number) {
    return await this.prisma.schedule.findMany({
      where: {
        userId: id,
        AND: {
          deletedAt: {
            equals: null,
          },
        },
      },
      include: {
        barber: {
          select: {
            name: true,
            email: true,
            id: true,
            surname: true,
            hashedRt: false,
            password: false,
            createdAt: false,
            deletedAt: false,
            updatedAt: false,
          },
        },
        service: {
          select: {
            description: true,
            id: true,
            price: true,
            createdAt: false,
            deletedAt: false,
            updatedAt: false,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
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
      orderBy: {
        deletedAt: 'desc',
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

  async createSchedule(createScheduleData: CreateScheduleDto, id: number) {
    const services = createScheduleData.service.map((id) => {
      return { id };
    });

    const schedule = await this.prisma.schedule.create({
      data: {
        status: true,
        userId: id,
        barberId: createScheduleData.barberId,
        ScheduledDateTime: createScheduleData.scheduledDateTime,
        service: {
          connect: services,
        },
      },
    });

    console.log(schedule.ScheduledDateTime);

    return schedule;
  }

  private getTimeSlotArray(today: string) {
    const currentDate = new Date(today);
    currentDate.setHours(currentDate.getHours() - 1);

    let timeSlotsQuantity = 24;
    const timeSlotMinutesBreach = 30;
    const dates: string[] = [];

    while (timeSlotsQuantity--) {
      dates.push(currentDate.toISOString());
      currentDate.setMinutes(currentDate.getMinutes() + timeSlotMinutesBreach);
    }

    return dates;
  }
}
