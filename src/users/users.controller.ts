import { Controller, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUser } from 'src/common/decorators';

@Controller('/api/v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('/update/:id')
  updateUserInformation(@Param('id') id: number @GetCurrentUser('sub') userId: number) {
  }
}
