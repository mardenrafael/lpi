import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LogModule } from 'src/log/log.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [LogModule, DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
