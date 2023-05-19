import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateSchaduleDto } from './dto';
import { GetCurrentUser } from 'src/common';

@Controller('/api/v1/schedule/')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}
  @Get('/mySchedule')
  public async getAllUserSchedules(@GetCurrentUser('sub') id: number) {
    return await this.scheduleService.findAllUserSchedules(id);
  }

  @Post('/')
  public async createSchedule(@Body() scheduleCreateData: CreateSchaduleDto) {
    return await this.createSchedule(scheduleCreateData);
  }
}
