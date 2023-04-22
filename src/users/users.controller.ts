import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUser } from 'src/common/decorators';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UseRoles } from 'nest-access-control';
import { Role, userDataResource } from 'src/common';
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
    @Param('id') id: string,
    @GetCurrentUser('sub') userId: number,
    @Body() updateUserInfoData: UpdateUserDto,
  ) {
    return await this.usersService.updateUserInformation(
      userId,
      updateUserInfoData,
    );
  }

  @Put('/role/update')
  async updateUserRole(@Body() updateUserRoleData: UpdateUserRoleDto) {
    const { id, role } = updateUserRoleData;
    return this.usersService.updateUserRole(id, role);
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
