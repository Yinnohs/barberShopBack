import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUser } from 'src/common/decorators';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UseRoles } from 'nest-access-control';
import { userDataResource } from 'src/common';
import { UpdateUserRoleDto } from './dto';

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
    @GetCurrentUser('sub') userId: number,
    @Body() updateUserInfoData: UpdateUserDto,
  ) {
    return await this.usersService.updateUserInformation(
      userId,
      updateUserInfoData,
    );
  }

  @UseRoles({
    resource: userDataResource,
    action: 'update',
    possession: 'any',
  })
  @Put('/information/update/barber/:id')
  async updateUserBarberInformation(
    @Param('id') id: string,
    @Body() updateUserInfoData: UpdateUserDto,
  ) {
    const userId = parseInt(id, 10);
    return await this.usersService.updateUserInformation(
      userId,
      updateUserInfoData,
    );
  }

  @Put('/role/update')
  async updateUserRole(@Body() updateUserRoleData: UpdateUserRoleDto) {
    const { id, role } = updateUserRoleData;
    const user = this.usersService.updateUserRole(id, role);
    return user;
  }

  @Get('/information')
  @UseRoles({
    resource: userDataResource,
    action: 'read',
    possession: 'own',
  })
  async getCurrentUserInformation(@GetCurrentUser('sub') id: string) {
    const userId = parseInt(id, 10);
    return await this.usersService.findOneUserInformation(userId);
  }

  @UseRoles({
    resource: userDataResource,
    action: 'update',
    possession: 'any',
  })
  @Get('/information/barber/:id')
  async getCurrentUserInformationById(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return await this.usersService.findOneUserInformation(userId);
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

  @Get('/barbers')
  async getAllBarbers(@GetCurrentUser('sub') id: number) {
    return await this.usersService.findAllBarbers(id);
  }
}
