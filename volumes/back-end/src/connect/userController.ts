import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request } from 'express';

import { PrismaService } from 'src/prisma/prisma.service';
import { connectService } from './connectService';

@Controller('user')
export class userController {
  constructor(
    private prismas: PrismaService,
    private readonly user: connectService,
  ) {}

  @Post('update')
  @UseGuards(AuthGuard('authGuard'))
  async UpdateInfoFirs(@Body() body: any) {
    await this.user.updateFirstTime(body);
  }
  @Post()
  @UseGuards(AuthGuard('authGuard'))
  async getAll(@Body('token') userId: string, @Req() req: Request) {
    try {
      const user = await this.prismas.user.findUnique({
        where: {
          id: req.user['id'],
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.message === 'P2002') throw new UnauthorizedException('error');
      throw error;
    }
  }
}
