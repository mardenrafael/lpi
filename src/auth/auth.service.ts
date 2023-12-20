import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDtoRequest } from './dto/sign-in-request.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDtoRequest): Promise<{
    access_token: string;
  }> {
    const { password, username, email } = signInDto;

    let user: User | null = null;

    if (username !== undefined) {
      user = await this.userService.findOneByName(username);
    } else if (email !== undefined) {
      user = await this.userService.findOneByEmail(email);
    }

    if (password !== user.password) {
      throw new UnauthorizedException();
    }

    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const expirationDateInSeconds = Math.round(currentDateInSeconds + 5 * 60);
    const tokenUuid = crypto.randomUUID();
    const userPayload = {
      sub: user.id,
      iat: currentDateInSeconds,
      exp: expirationDateInSeconds,
      jti: tokenUuid,
    };
    const accessToken = await this.jwtService.signAsync(userPayload, {
      privateKey: process.env.JWT_SECRET,
    });

    return {
      access_token: accessToken,
    };
  }
}
