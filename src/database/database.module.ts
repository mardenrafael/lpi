import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { LogModule } from 'src/log/log.module';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [LogModule],
})
export class DatabaseModule {}
