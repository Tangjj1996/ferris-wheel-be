import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { produce } from 'immer';
import { UserDashboardConfig } from './entities/UserDashboardConfig.entity';
import { UserDashboardConifgItems } from './entities/UserDashboardConifgItems.entity';
import { userDashboardConfig, userDashboardConifgItems } from './const';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserDashboardConfig)
    private readonly userDashboardConfigRepository: Repository<UserDashboardConfig>,

    @InjectRepository(UserDashboardConifgItems)
    private readonly UserDashboardConifgItemsRepository: Repository<UserDashboardConifgItems>,
  ) {}

  /**
   * 获取用户配置
   * 根据 openid，查找
   * 如果没有数据，初始化数据，
   * 如果有数据，返回最新数据
   */
  async getConfig(openid: string) {
    let config = await this.userDashboardConfigRepository.find({
      where: { auth: { openid } },
      relations: ['userDashboardConifgItems', 'auth'],
    });

    if (!config) {
      config = await this.init();
    }

    console.log('config::::::::::', config);
    return config;
  }

  /**
   * 初始化数据
   */
  async init() {
    // 赋值 openid
    const dashboardConfig = userDashboardConfig;
    // userDashboardConfig 关联到父级
    const dashboardConfigImtes = produce(
      userDashboardConifgItems,
      (confing) => {
        confing.forEach(
          (item) =>
            (item.userDashboardConfig = dashboardConfig.find(
              (dItem) => dItem.id === item.id,
            ) as any),
        );
      },
    );

    await this.userDashboardConfigRepository.save(dashboardConfig);
    await this.UserDashboardConifgItemsRepository.save(dashboardConfigImtes);

    console.log(dashboardConfig, dashboardConfigImtes, '++++');

    return dashboardConfig as UserDashboardConfig[];
  }
}
