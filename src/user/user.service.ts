import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDashboardConfig } from './entities/UserDashboardConfig.entity';
import { UserDashboardConifgItems } from './entities/UserDashboardConifgItems.entity';
import { userDashboardConfig, userDashboardConifgItems } from './const';
import { Auth } from '@/auth/entities/auth.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,

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

    if (!config.length) {
      config = await this.init(openid);
    }

    return config;
  }

  /**
   * 初始化数据
   */
  async init(openid: string) {
    const result = await Promise.all(
      userDashboardConfig.map(async (item, index) => {
        const userDashboardConfigInstant = new UserDashboardConfig();
        const auth = await this.authRepository.findOne({
          where: { openid },
        });

        userDashboardConfigInstant.dashboardTitle = item.dashboardTitle;
        userDashboardConfigInstant.dashboardType = item.dashboardType;
        userDashboardConfigInstant.auth = auth;

        await this.userDashboardConfigRepository.save(
          userDashboardConfigInstant,
        );

        const userDashboardConifgItemsResults = userDashboardConifgItems[
          index
        ].map((iItem) => {
          const userDashboardConfigItemsInstant =
            new UserDashboardConifgItems();

          userDashboardConfigItemsInstant.text = iItem.text;
          userDashboardConfigItemsInstant.priority = iItem.priority;
          userDashboardConfigItemsInstant.background = iItem.background;
          userDashboardConfigItemsInstant.userDashboardConfig =
            userDashboardConfigInstant;

          return userDashboardConfigItemsInstant;
        });

        await this.UserDashboardConifgItemsRepository.save(
          userDashboardConifgItemsResults,
        );

        userDashboardConfigInstant.userDashboardConifgItems =
          userDashboardConifgItemsResults;

        return userDashboardConfigInstant;
      }),
    );

    return result;
  }
}
