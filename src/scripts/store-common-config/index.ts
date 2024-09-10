/**
 * 保存公共配置
 */
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { CommonService } from '@/common/common.service';
import { HotDashboardConfig } from '@/common/entities/HotDashboardConfig';
import { HotDashboardConfigItems } from '@/common/entities/HotDashboardConfigItems';

import { hotDashboardConfig, hotDashboardConfigItems } from './const';

async function storeCommonConfig() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const commonService = app.get(CommonService);

  for (const [index, config] of hotDashboardConfig.entries()) {
    const { dashboard_type, dashboard_option, dashboard_title } = config;
    const hotDashboardConfigEntities = new HotDashboardConfig();

    hotDashboardConfigEntities.dashboard_type = dashboard_type;
    hotDashboardConfigEntities.dashboard_option = dashboard_option;
    hotDashboardConfigEntities.dashboard_title = dashboard_title;

    const hotDashboardConfigItemsEntities = hotDashboardConfigItems[index].map(
      (iItem) => {
        const { background, text, priority } = iItem;
        const entity = new HotDashboardConfigItems();

        entity.background = background;
        entity.text = text;
        entity.priority = priority;

        return entity;
      },
    );

    await commonService.saveHotDashboardConfig(
      hotDashboardConfigEntities,
      hotDashboardConfigItemsEntities,
    );
  }

  await app.close();
}

storeCommonConfig();
