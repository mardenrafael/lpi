import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDtoRequest } from './dto/sign-in-request.dto';
import { SignInDtoResponse } from './dto/sign-in-response.dto';
import { IsPublic } from 'src/decorator/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  async signIn(
    @Body() signInDto: SignInDtoRequest,
  ): Promise<SignInDtoResponse> {
    const result = await this.authService.signIn(signInDto);

    const responseDto = new SignInDtoResponse();
    responseDto.accessToken = result.access_token;

    return responseDto;
  }
}
