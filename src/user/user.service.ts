import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDashboardConfig } from './entities/UserDashboardConfig.entity';
import { UserDashboardConfigItems } from './entities/UserDashboardConfigItems.entity';
import { userDashboardConfig, userDashboardConfigItems } from './const';
import { Auth } from '@/auth/entities/auth.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,

    @InjectRepository(UserDashboardConfig)
    private readonly userDashboardConfigRepository: Repository<UserDashboardConfig>,

    @InjectRepository(UserDashboardConfigItems)
    private readonly userDashboardConfigItemsRepository: Repository<UserDashboardConfigItems>,
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
      relations: ['userDashboardConfigItems', 'auth'],
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
    const auth = await this.authRepository.findOneOrFail({ where: { openid } });

    const configs = await Promise.all(
      userDashboardConfig.map(async (item, index) => {
        const userDashboardConfigInstant =
          this.userDashboardConfigRepository.create({
            dashboardTitle: item.dashboardTitle,
            dashboardType: item.dashboardType,
            auth,
          });

        const items = userDashboardConfigItems[index].map((iItem) =>
          this.userDashboardConfigItemsRepository.create({
            text: iItem.text,
            priority: iItem.priority,
            background: iItem.background,
            userDashboardConfig: userDashboardConfigInstant,
          }),
        );

        // Assign items to the config instance
        userDashboardConfigInstant.userDashboardConfigItems = items;

        // Save both config and items
        await this.userDashboardConfigRepository.save(
          userDashboardConfigInstant,
        );
        await this.userDashboardConfigItemsRepository.save(items);

        return userDashboardConfigInstant;
      }),
    );

    return configs;
  }
}
