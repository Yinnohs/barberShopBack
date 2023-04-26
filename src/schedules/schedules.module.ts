import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [],
  providers: [ScheduleService],
})
export class SchedulesModule {}
