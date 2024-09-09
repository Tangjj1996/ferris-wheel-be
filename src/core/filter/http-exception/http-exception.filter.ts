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
    const exceptionResponse = exception.getResponse();

    // 设置错误信息
    const message =
      typeof exceptionResponse === 'object'
        ? exceptionResponse['message']
        : `${status > HttpStatus.INTERNAL_SERVER_ERROR ? 'Service error' : 'Client Error'}`;

    const errorResponse = {
      data: null,
      code: status,
      msg: message,
      traceId: new Date().toLocaleString(),
    };

    // 设置返回的状态码，请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
