import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateUserDto } from './dto';
import { select, selectBarbers } from './utils';
import { Role } from 'src/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneUserInformation(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
      select: selectBarbers,
    });

    if (!user) throw new BadRequestException();

    return user;
  }

  async updateUserInformation(
    id: number,
    updateUserInformation: UpdateUserDto,
  ) {
    const currentDate = new Date();
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserInformation,
        updatedAt: currentDate,
      },
      select,
    });

    if (!user) throw new BadRequestException();

    return user;
  }

  async findAllUserInformation() {
    const users = await this.prisma.user.findMany({ select });
    return users;
  }

  async findAllBarbers() {
    const barbers = await this.prisma.user.findMany({
      where: {
        role: 'BARBER',
        OR: {
          role: 'ADMIN',
        },
      },
      select,
    });
    return barbers;
  }

  async updateUserRole(id: number, role: Role) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { role },
      select,
    });

    if (!user) throw new BadRequestException();
  }
}
