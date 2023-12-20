import { User } from '../entities/user.entity';

export class UserDto {
  id: number;

  static fromEntity(user: User): UserDto {
    const userDto = new UserDto();
    userDto.id = user.id;

    return userDto;
  }

  static fromEntityList(users: User[]): UserDto[] {
    const usersDtos = users.map((user) => {
      const userDto = new UserDto();
      userDto.id = user.id;

      return userDto;
    });

    return usersDtos;
  }
}
