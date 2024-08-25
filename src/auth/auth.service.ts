import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { UserDashboardConfig } from '@/user/entities/UserDashboardConfig.entity';
import { UserDashboardConfigItems } from '@/user/entities/UserDashboardConfigItems.entity';
import { userDashboardConfig, userDashboardConfigItems } from '@/user/const';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(Auth)
    private readonly useRepository: Repository<Auth>,
    @InjectRepository(UserDashboardConfig)
    private readonly userDashboardConfigRepository: Repository<UserDashboardConfig>,

    @InjectRepository(UserDashboardConfigItems)
    private readonly userDashboardConfigItemsRepository: Repository<UserDashboardConfigItems>,
  ) {}

  async wechatLogin(code: string) {
    // step1: 请求微信的 jscode2session 接口
    const response = await axios.get(
      `https://api.weixin.qq.com/sns/jscode2session`,
      {
        params: {
          appid: this.configService.get<string>('WECHAT_APPID'),
          secret: this.configService.get<string>('WECHAT_SECRET'),
          js_code: code,
          grant_type: 'authorization_code',
        },
      },
    );
    const { openid } = response.data;
    if (!openid) {
      throw new HttpException(
        {
          code: 4001,
          msg: '',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // step2: 根据 openid 查找或创建用户
    const user = await this.findOrCreateUser(openid);

    // step3: 生成 JWT token
    const token = this.jwtService.sign(
      { userId: user.id },
      { secret: this.configService.get<string>('JWT_SECRET') },
    );

    return { token, openid };
  }

  private async findOrCreateUser(openid: string) {
    // 此处应查询数据库是否存在用户，若不存在则创建用户
    let user = await this.useRepository.findOne({ where: { openid } });
    if (!user) {
      user = this.useRepository.create({ openid });
      user.userDashboardConfig = await Promise.all(
        userDashboardConfig.map(async (item, index) => {
          const userDashboardConfigInstant =
            this.userDashboardConfigRepository.create({
              dashboardTitle: item.dashboardTitle,
              dashboardType: item.dashboardType,
            });

          const items = userDashboardConfigItems[index].map((iItem) =>
            this.userDashboardConfigItemsRepository.create({
              text: iItem.text,
              priority: iItem.priority,
              background: iItem.background,
            }),
          );
          await this.userDashboardConfigItemsRepository.save(items);

          userDashboardConfigInstant.userDashboardConfigItems = items;
          await this.userDashboardConfigRepository.save(
            userDashboardConfigInstant,
          );

          return userDashboardConfigInstant;
        }),
      );
      await this.useRepository.save(user);
    }

    return user;
  }
}
