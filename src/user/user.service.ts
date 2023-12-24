import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LogService } from 'src/log/log.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly logService: LogService,
    private readonly prismaService: PrismaService,
  ) {}

  async findOneByEmail(userEmail: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findOneById(userId: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getAll(): Promise<User[]> {
    const users = await await this.prismaService.user.findMany();
    return users;
  }

  async create({ email, password, username }: CreateUserDto): Promise<void> {
    await this.prismaService.user.create({
      data: {
        password,
        email,
        name: username,
      },
    });
  }

  async findOneByName(username: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        name: username,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
