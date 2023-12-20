import { User } from '../entities/user.entity';

export class UserProfileResponseDto {
  username: string;
  email: string;

  static fromEntity(user: User): UserProfileResponseDto {
    const userDto = new UserProfileResponseDto();
    userDto.username = user.name;
    userDto.email = user.email;

    return userDto;
  }
}
