import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDashboardConfig } from './entities/UserDashboardConfig.entity';
import { UserDashboardConfigItems } from './entities/UserDashboardConfigItems.entity';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDashboardConfig, UserDashboardConfigItems]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
