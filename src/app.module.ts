import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard, RBCA_POLICY } from './common';
import { ACGuard, AccessControlModule } from 'nest-access-control';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    AccessControlModule.forRoles(RBCA_POLICY),
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
export class AppModule {}
