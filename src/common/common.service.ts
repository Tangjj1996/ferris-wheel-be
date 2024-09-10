import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { Repository } from 'typeorm';

import { UserDashboardConfig } from '@/user/entities/UserDashboardConfig.entity';
import { DashboardOption, PrizesBg } from '@/user/enum';

import { HotDashboardConfig } from './entities/HotDashboardConfig';
import { HotDashboardConfigItems } from './entities/HotDashboardConfigItems';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(UserDashboardConfig)
    private readonly userDashboardConfigRepository: Repository<UserDashboardConfig>,

    @InjectRepository(HotDashboardConfig)
    private readonly hotDashboardConfigRepository: Repository<HotDashboardConfig>,
  ) {}

  async getRandomUserDashboardConfigItems() {
    const userDashboardConfigItems = (
      await this.userDashboardConfigRepository.find({
        where: { dashboard_option: DashboardOption.eat },
        relations: {
          user_dashboard_config_items: true,
        },
      })
    )
      .map(({ user_dashboard_config_items }) => user_dashboard_config_items)
      .flat();
    const totalCount = userDashboardConfigItems.length;
    if (totalCount === 0) {
      return [];
    }

    const randomIndexs: number[] = [];
    while (randomIndexs.length < 6 && randomIndexs.length < totalCount) {
      const randomIndex = randomInt(totalCount);
      if (!randomIndexs.includes(randomIndex)) {
        let flag = true;
        for (let i = 0; i < randomIndexs.length; i++) {
          if (
            userDashboardConfigItems[randomIndexs[i]].text ===
            userDashboardConfigItems[randomIndex].text
          ) {
            flag = false;
          }
        }
        if (flag) {
          randomIndexs.push(randomIndex);
        }
      }
    }

    return randomIndexs.map((rIndex, index) => ({
      ...userDashboardConfigItems[rIndex],
      background: index % 2 === 0 ? PrizesBg.odd : PrizesBg.even,
    }));
  }

  async saveHotDashboardConfig(
    hotDashboardConfig: HotDashboardConfig,
    hotDashboardConfigItems: HotDashboardConfigItems[],
  ) {
    return this.hotDashboardConfigRepository.manager.transaction(
      async (transactionalEntityManager) => {
        // Save hotDashboardConfigItems first
        const savedItems = await transactionalEntityManager.save(
          HotDashboardConfigItems,
          hotDashboardConfigItems,
        );

        // Associate hotDashboardConfig with saved hotDashboardConfigItems
        hotDashboardConfig.hot_dashboard_config_items = savedItems;

        // Save hotDashboardConfig with associated items
        return await transactionalEntityManager.save(
          HotDashboardConfig,
          hotDashboardConfig,
        );
      },
    );
  }

  async getHotDashboardConfig() {
    return await this.hotDashboardConfigRepository.find({
      relations: {
        hot_dashboard_config_items: true,
      },
    });
  }
}
