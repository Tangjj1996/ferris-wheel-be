import { Controller, Get } from '@nestjs/common';

import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('getRandomConfig')
  async getRandomConfig() {
    return await this.commonService.getRandomUserDashboardConfigItems();
  }

  @Get('getHotDashboardConfig')
  async getHotList() {
    return await this.commonService.getHotDashboardConfig();
  }
}
