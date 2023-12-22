import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { UserInfo } from './entities/user-info.entity';
import { Constants } from 'src/constants/constants';
import { IS_PUBLIC } from 'src/decorator/is-public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.reflector == undefined) {
      this.reflector = new Reflector();
    }

    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token: string = this.getTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    let payload = null;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      if (payload) {
        const userId = payload['sub'];
        const user = await this.userService.findOneById(userId);
        const userInfo = new UserInfo();
        userInfo.id = user.id;
        userInfo.email = user.email;
        userInfo.nome = user.name;

        request[Constants.USER_INFO] = userInfo;
      }
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private getTokenFromHeader(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
