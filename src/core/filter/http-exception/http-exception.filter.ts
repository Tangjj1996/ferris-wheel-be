import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response 对象
    // todo dto 转换抛出错误
    const status = exception?.getStatus?.() || 500; // 获取异常状态码

    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${status > 500 ? 'Service error' : 'Client Error'}`;

    const errorResponse = {
      data: null,
      code: response?.code ?? -1,
      msg: response?.msg ?? message,
      traceId: '111',
    };

    // 设置返回的状态码，请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
