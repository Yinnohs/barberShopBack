import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUser } from 'src/common/decorators';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UseRoles } from 'nest-access-control';
import { userDataResource } from 'src/common';

@Controller('/api/v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('/information/update')
  @UseRoles({
    resource: userDataResource,
    action: 'update',
    possession: 'own',
  })
  async updateUserInformation(
    @Param('id') id: string,
    @GetCurrentUser('sub') userId: number,
    @Body() updateUserInfoData: UpdateUserDto,
  ) {
    return await this.usersService.updateUserInformation(
      userId,
      updateUserInfoData,
    );
  }

  @Get('/information')
  @UseRoles({
    resource: userDataResource,
    action: 'read',
    possession: 'own',
  })
  async getCurrentUserInformation(@GetCurrentUser('id') id: number) {
    return await this.usersService.findOneUserInformation(id);
  }

  @Get('/all')
  @UseRoles({
    resource: userDataResource,
    action: 'read',
    possession: 'any',
  })
  async getAllUsersInformation() {
    return await this.usersService.findAllUserInformation();
  }
}
