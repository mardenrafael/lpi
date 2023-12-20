import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user-response.dto';
import { UserService } from './user.service';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { IsPublic } from 'src/is-public/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userService.create(createUserDto);
  }

  @Get()
  async getAll(): Promise<UserDto[]> {
    const users = await this.userService.getAll();

    const usersDtos = UserDto.fromEntityList(users);

    return usersDtos;
  }

  @Get('/profile')
  async getUserProfile(
    @Query('user_id', ParseIntPipe) userId: number,
  ): Promise<UserProfileResponseDto> {
    const user = await this.userService.findOneById(userId);

    const userProfileResponseDto: UserProfileResponseDto =
      UserProfileResponseDto.fromEntity(user);

    return userProfileResponseDto;
  }
}
