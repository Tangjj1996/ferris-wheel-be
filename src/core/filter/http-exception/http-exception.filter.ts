import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse<Response>(); // 获取请求上下文中的 response 对象
    const status = exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR; // 获取异常状态码
    if (!(exception instanceof HttpException)) {
      response
        .header('Content-Type', 'application/json; charset=utf-8')
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          data: null,
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          msg: '服务器错误',
          traceId: new Date().toLocaleString(),
        });
      return;
    }
    const exceptionResponse = exception.getResponse();
    const errorResponse = {
      data: null,
      code: exceptionResponse?.['code'] ?? exceptionResponse['statusCode'],
      msg: exceptionResponse?.['msg'] ?? exceptionResponse['message'],
      traceId: new Date().toLocaleString(),
    };

    // 设置返回的状态码，请求头，发送错误信息
    response
      .header('Content-Type', 'application/json; charset=utf-8')
      .status(status)
      .send(errorResponse);
  }
}
