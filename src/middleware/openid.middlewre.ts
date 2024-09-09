import { Injectable, NestMiddleware } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { BizHttpStatus } from '@/enums';

@Injectable()
export class OpenIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const openid = req.headers?.openid;
    if (!openid) {
      throw new HttpException(
        {
          code: BizHttpStatus.user_not_get_openid,
          msg: '用户 openid 不存在',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    next();
  }
}
