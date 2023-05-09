import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard, RBCA_POLICY } from './common';
import { ACGuard, AccessControlModule } from 'nest-access-control';
import { ServiceModule } from './service/service.module';
import { SchedulesModule } from './schedules/schedules.module';
import { RequestLoggerMiddleware } from './common/middleware';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    AccessControlModule.forRoles(RBCA_POLICY),
    ServiceModule,
    SchedulesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ACGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
