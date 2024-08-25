import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDashboardConfig } from './entities/UserDashboardConfig.entity';
import { DashboardType } from './enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserDashboardConfig)
    private readonly userDashboardConfigRepository: Repository<UserDashboardConfig>,
  ) {}

  /**
   * 获取用户配置
   * 根据 openid，查找
   * 如果没有数据，初始化数据，
   * 如果有数据，返回最新数据
   */
  async getConfig(openid: string) {
    const config = await this.userDashboardConfigRepository.find({
      where: { auth: { openid } },
      relations: {
        user_dashboard_config_items: true,
      },
    });

    const transformConfig = config.map(
      ({ user_dashboard_config_items, ...item }) => {
        const originConfigItems = {
          ...item,
          luck_wheel_config: null,
          luck_grid_config: null,
          slot_machine_config: null,
        };
        if (item.dashboard_type === DashboardType.wheel) {
          originConfigItems.luck_wheel_config = user_dashboard_config_items;
        }

        return originConfigItems;
      },
    );

    return transformConfig;
  }
}
