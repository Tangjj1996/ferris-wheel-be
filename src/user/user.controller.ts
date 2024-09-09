import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { Collection } from './DTO/Collection';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 获取用户配置项
   * @param req
   * @returns
   */
  @Get('config')
  async getConfig(@Req() req: Request) {
    const { openid } = req.headers || {};
    return this.userService.getConfig(openid as string);
  }

  /***
   * 收藏夹
   */
  @Post('collection')
  async saveCollection(@Body() body: Collection, @Req() req: Request) {
    const { openid } = req.headers || {};
    return this.userService.saveCollection(openid as string);
  }
}
