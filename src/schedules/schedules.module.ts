import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import moment from 'moment';

@Module({
  imports: [],
  providers: [ScheduleService, { provide: 'momentWrapper', useValue: moment }],
  controllers: [ScheduleController],
})
export class SchedulesModule {}
