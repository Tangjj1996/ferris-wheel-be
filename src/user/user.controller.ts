import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('config')
  async getConfig(@Req() req: Request) {
    const { openid } = req.headers || {};
    if (!openid) {
      throw new HttpException('openid 不存在', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.getConfig(openid as string);
  }
}
