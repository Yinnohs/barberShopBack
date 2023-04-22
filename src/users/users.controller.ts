import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUser } from 'src/common/decorators';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('/api/v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('/update/:id')
  async updateUserInformation(
    @Param('id') id: string,
    @GetCurrentUser('sub') userId: number,
    @Body() updateUserInfoData: UpdateUserDto,
  ) {
    const numberId = parseInt(id, 10);

    if (numberId !== userId) {
      throw new BadRequestException(
        ' No puedes actualizar la información de otra cuenta ',
      );
    }
    return await this.usersService.updateUserInformation(
      userId,
      updateUserInfoData,
    );
  }

  @Get('/information')
  async getCurrentUserInformation(@GetCurrentUser('id') id: number) {
    return await this.usersService.findOneUserInformation(id);
  }

  async getAllUsersInformation() {
    return await this.usersService.findAllUserInformation();
  }
}
