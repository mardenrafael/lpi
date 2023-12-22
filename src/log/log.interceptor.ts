import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { LogService } from './log.service';
import { Constants } from 'src/constants/constants';
import { UserInfo } from 'src/auth/entities/user-info.entity';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    const userInfo: UserInfo = request[Constants.USER_INFO];

    this.logService.log(
      LogInterceptor.name,
      request,
      `Requesição feita em -> ${request.url} ${
        userInfo ? `pelo usuario ${userInfo.nome}` : ' [ endpoint publico ]'
      }`,
    );

    return next.handle();
  }
}
