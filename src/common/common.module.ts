import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '@/user/user.module';

import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { HotDashboardConfig } from './entities/HotDashboardConfig';
import { HotDashboardConfigItems } from './entities/HotDashboardConfigItems';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotDashboardConfig, HotDashboardConfigItems]),
    UserModule,
  ],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
