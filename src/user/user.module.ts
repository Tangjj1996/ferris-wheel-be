import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDashboardConfig } from './entities/UserDashboardConfig.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDashboardConfig])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
