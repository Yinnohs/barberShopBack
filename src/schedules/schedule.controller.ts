import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto';
import { GetCurrentUser } from 'src/common';

@Controller('/api/v1/schedule/')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}
  @Get('/my')
  public async getAllUserSchedules(@GetCurrentUser('sub') id: number) {
    return await this.scheduleService.findAllUserSchedules(id);
  }

  @Get('/barber/:id/schedules/')
  public async getAllBarberSchedules(@Param('id') barberId: number) {
    return await this.scheduleService.findAllBarberSchedules(barberId);
  }

  @Get('/barber/schedules/')
  public async getAllBarberSchedulesOnebarber(
    @GetCurrentUser('sub') barberId: number,
  ) {
    return await this.scheduleService.findAllBarberSchedules(barberId);
  }

  @Post('/')
  public async createSchedule(@Body() scheduleCreateData: CreateScheduleDto) {
    return await this.scheduleService.createSchedule(scheduleCreateData);
  }

  @Delete('/delete')
  public async softDeleteSchedule(@Body('scheduleId') id: number) {
    return await this.scheduleService.softDeleteSchedule(id);
  }

  @Delete('/delete/hard')
  public async hardDeleteSchedule(@Body('scheduleId') id: number) {
    return await this.scheduleService.deleteSchedule(id);
  }
}
