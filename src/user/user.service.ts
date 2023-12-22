import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LogService } from 'src/log/log.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  constructor(
    private readonly logService: LogService,
    private readonly prismaService: PrismaService,
  ) {}

  async findOneByEmail(userEmail: string): Promise<User> {
    const user: User[] = this.users.filter(({ email }) => email === userEmail);

    if (user.length === 0) {
      throw new NotFoundException();
    }

    return user[0];
  }

  async findOneById(userId: number): Promise<User> {
    const user: User[] = this.users.filter(({ id }) => id === userId);

    if (user.length === 0) {
      throw new NotFoundException();
    }

    return user[0];
  }

  async getAll(): Promise<User[]> {
    this.logService.log(UserService.name, null, 'kaskdas');
    return this.users;
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    this.prismaService.user.create({
      data: {
        password: '',
        email: '',
        name: '',
      },
    });

    try {
      await this.findOneByName(createUserDto.username);
    } catch (err) {
      if (err instanceof NotFoundException == false) {
        throw err;
      }
    }

    const lastUser: User | undefined = this.users[this.users.length - 1];
    const user: User = CreateUserDto.toEntity(createUserDto);
    user.id = lastUser === undefined ? 0 : lastUser.id + 1;

    this.users.push(user);
  }

  async findOneByName(username: string): Promise<User> {
    const user: User[] = this.users.filter(({ name }) => name === username);

    if (user.length === 0) {
      throw new NotFoundException();
    }

    return user[0];
  }
}
