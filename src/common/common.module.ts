import { Module } from '@nestjs/common';

import { UserModule } from '@/user/user.module';

import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  imports: [UserModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
