import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.headers.userid as string);

    // try {
    //   const data = await this.prisma.user.findUnique({
    //     where: { id },
    //   });
    //   if (data) next();
    // } catch (error) {
    //   throw new UnauthorizedException('Unauthorized');
    // }
    console.log('rr', req.user);
    next();

    // throw new UnauthorizedException('Unauthorized');
  }
}
