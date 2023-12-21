import { Module } from '@nestjs/common';
import { LogInterceptor } from './log.interceptor';
import { LogService } from './log.service';

@Module({
  providers: [LogInterceptor, LogService],
  exports: [LogInterceptor, LogService],
})
export class LogModule {}
