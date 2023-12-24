import { User } from '../entities/user.entity';

export class UserResponseDto {
  id: number;

  static fromEntity(user: User): UserResponseDto {
    const userDto = new UserResponseDto();
    userDto.id = user.id;

    return userDto;
  }

  static fromEntityList(users: User[]): UserResponseDto[] {
    const usersDtos = users.map((user) => {
      const userDto = new UserResponseDto();
      userDto.id = user.id;

      return userDto;
    });

    return usersDtos;
  }
}
