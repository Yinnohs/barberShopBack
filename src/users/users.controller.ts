import { Body, Controller, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUser } from 'src/common/decorators';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('/api/v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('/update/:id')
  updateUserInformation(
    @Param('id') id: string,
    @GetCurrentUser('sub') userId: number,
    @Body() updateUserInfoData: UpdateUserDto,
  ) {
    const numberId = parseInt(id, 10);
    if (numberId !== userId) {
      return { message: 'you cannot update another account user information ' };
    }
    return { message: updateUserInfoData };
  }
}
