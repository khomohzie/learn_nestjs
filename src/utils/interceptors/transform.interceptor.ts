import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { CUSTOM_MESSAGE_KEY } from '../decorators/custom-message.decorator';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    const statusCode = response.statusCode;
    return next.handle().pipe(
      map((data: T) => ({
        statusCode,
        message:
          this.reflector.get<string>(
            CUSTOM_MESSAGE_KEY,
            context.getHandler(),
          ) || 'Success',
        data,
      })),
    );
  }
}
