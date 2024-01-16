import { Injectable, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class jwtstrategy extends PassportStrategy(Strategy, 'authGuard') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any, @Req() req: Request) {
    try {
      const res = await this.prisma.user.findFirst({
        where: { id: payload.id },
      });
      req.user = res;
      return res;
    } catch (error) {
      return error;
    }
  }
}
