import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OpenIdMiddleware } from '@/middleware/openid.middlewre';

import { Auth } from '../auth/entities/auth.entity';
import { UserDashboardConfig } from './entities/UserDashboardConfig.entity';
import { UserDashboardConfigItems } from './entities/UserDashboardConfigItems.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserDashboardConfig,
      UserDashboardConfigItems,
      Auth,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OpenIdMiddleware).forRoutes('user');
  }
}
