import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cloneDeep } from 'lodash';
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

    if (!config.length) {
      config = await this.init();
    }
    return config;
  }

  /**
   * 初始化数据
   */
  async init() {
    const userDashboardConfigClone = cloneDeep(userDashboardConfig);
    const userDashboardConifgItemsClone = cloneDeep(userDashboardConifgItems);

    await this.userDashboardConfigRepository.save(userDashboardConfigClone);
    await Promise.all([
      userDashboardConifgItemsClone.map(async (userDashboardConifgItem) => {
        await this.UserDashboardConifgItemsRepository.save(
          userDashboardConifgItem,
        );
      }),
    ]);

    console.log(userDashboardConfigClone, userDashboardConifgItemsClone);

    return userDashboardConfigClone as UserDashboardConfig[];
  }
}
