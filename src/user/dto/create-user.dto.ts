import { User } from '../entities/user.entity';

export class CreateUserDto {
  username: string;
  password: string;
  email: string;

  static toEntity(createUserDto: CreateUserDto): User {
    const user = new User();
    user.name = createUserDto.username;
    user.password = createUserDto.password;
    user.email = createUserDto.email;

    return user;
  }
}
