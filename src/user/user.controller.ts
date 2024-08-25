import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { BizHttpStatus } from '@/enums';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('config')
  async getConfig(@Req() req: Request) {
    const { openid } = req.headers || {};
    if (!openid) {
      throw new HttpException(
        {
          code: BizHttpStatus.user_not_get_openid,
          msg: '用户 openid 不存在',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.userService.getConfig(openid as string);
  }
}
