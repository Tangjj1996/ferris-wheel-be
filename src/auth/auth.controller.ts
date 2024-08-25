import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('wx-login')
  async wechatLogin(@Body('code') code: string) {
    return await this.authService.wechatLogin(code);
  }
}
