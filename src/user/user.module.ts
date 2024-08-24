import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDashboardConfig } from './entities/UserDashboardConfig.entity';
import { UserDashboardConifgItems } from './entities/UserDashboardConifgItems.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDashboardConfig, UserDashboardConifgItems]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
