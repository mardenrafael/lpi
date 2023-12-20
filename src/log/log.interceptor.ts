import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { LogService } from './log.service';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const currentTime = Date.now();
    const request: Request = context.switchToHttp().getRequest();
    const response = next.handle();

    this.logService.log(
      LogInterceptor.name,
      `Time to process -> ${Date.now() - currentTime}ms request on ${
        request.url
      }`,
    );

    return response;
  }
}
