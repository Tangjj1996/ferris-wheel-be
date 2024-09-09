import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEqual } from 'lodash';
import { Repository } from 'typeorm';

import { BizHttpStatus } from '@/enums';

import { Auth } from '../auth/entities/auth.entity';
import { CollectionDTO } from './DTO/Collection';
import { UserDashboardConfig } from './entities/UserDashboardConfig.entity';
import { UserDashboardConfigItems } from './entities/UserDashboardConfigItems.entity';
import { DashboardType } from './enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserDashboardConfig)
    private readonly userDashboardConfigRepository: Repository<UserDashboardConfig>,

    @InjectRepository(UserDashboardConfigItems)
    private readonly userDashboardConfigItemsRepository: Repository<UserDashboardConfigItems>,

    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
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

  /**
   * 收藏功能
   */
  async saveCollection(openid: string, collectionDto: CollectionDTO) {
    const userDashboardConfig = await this.userDashboardConfigRepository.find({
      where: { auth: { openid } },
      relations: {
        user_dashboard_config_items: true,
      },
    });

    const isExist = userDashboardConfig.some((item) => {
      const {
        dashboard_title,
        dashboard_type,
        dashboard_option,
        user_dashboard_config_items,
      } = item;
      const composeItem = {
        dashboard_title,
        dashboard_type,
        dashboard_option,
        user_dashboard_config_items: user_dashboard_config_items.map(
          ({ text, background, priority }) => ({ text, background, priority }),
        ),
      };

      return isEqual(composeItem, collectionDto);
    });

    // 如果已存在则不需要收藏
    if (isExist) {
      throw new HttpException(
        {
          code: BizHttpStatus.user_has_already_exist,
          msg: '转盘配置已存在，无须再次收藏',
        },
        HttpStatus.OK,
      );
    }
    const {
      dashboard_title,
      dashboard_type,
      dashboard_option,
      user_dashboard_config_items,
    } = collectionDto;

    const auth = await this.authRepository.findOne({ where: { openid } });

    const userDashboardConfigInstance =
      this.userDashboardConfigRepository.create({
        dashboard_title,
        dashboard_type,
        dashboard_option,
        auth,
      });
    const items: UserDashboardConfigItems[] = [];
    for (let i = 0; i < user_dashboard_config_items.length; i++) {
      const configItem = this.userDashboardConfigItemsRepository.create({
        text: user_dashboard_config_items[i].text,
        priority: user_dashboard_config_items[i].priority,
        background: user_dashboard_config_items[i].background,
      });
      items.push(
        await this.userDashboardConfigItemsRepository.save(configItem),
      );
    }
    userDashboardConfigInstance.user_dashboard_config_items = items;
    await this.userDashboardConfigRepository.save(userDashboardConfigInstance);
  }
}
