import {
  Body,
  Controller,
  Get,
  Injectable,
  Query,
  Req,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Res,
  UseGuards,
} from '@nestjs/common';
import { connectService } from './connectService';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
@Controller('42')
@Injectable()
export class connectController {
  constructor(
    private readonly connect: connectService,
    private configs: ConfigService,
  ) {}
  async signup(@Body() obj: any) {
    const status = await this.connect.UserExistance(obj);
    if (!status) {
      await this.connect.CreatUser(obj);
    }
    const j = this.connect.finUserById(obj);
    return await this.connect.generateToken({ id: (await j).id });
  }
  @Get('oauth')
  @UseGuards(AuthGuard('42'))
  async fortyTwoOAuth(
    @Query('code') code: string,
    @Req() req: Request,
    @Res() Res: Response,
  ) {
    const obj = req.user;
    const token = await this.signup(obj);
    console.log(token);
    Res.cookie('token', token);
    Res.redirect(this.configs.get('REDIRECT_URL'));
  }
}
