import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Scope,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LogService } from 'src/log/log.service';

@Injectable({
  scope: Scope.REQUEST,
})
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly logService: LogService) {
    super();
  }

  async onModuleInit() {
    this.logService.log(
      PrismaService.name,
      null,
      'Abrindo conexão com o banco de dados',
    );

    try {
      await this.$connect();
      this.logService.log(
        PrismaService.name,
        null,
        'Conexão com o banco de dados aberta com sucesso',
      );
    } catch {
      this.logService.error(
        PrismaService.name,
        null,
        'Erro ao abrir com o banco de dados',
      );
    }
  }

  async onModuleDestroy() {
    this.logService.log(
      PrismaService.name,
      null,
      'Fechando conexão com o banco de dados',
    );

    try {
      await this.$disconnect();
      this.logService.log(
        PrismaService.name,
        null,
        'Conexão com o banco de dados fechada com sucesso',
      );
    } catch {
      this.logService.error(
        PrismaService.name,
        null,
        'Erro ao fechar conexão com o banco de dados',
      );
    }
  }
}
