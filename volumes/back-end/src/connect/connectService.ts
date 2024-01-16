import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable({})
export class connectService {
  constructor(
    private prismas: PrismaService,
    private token: JwtService,
    private config: ConfigService,
  ) {}
  async CreatUser(obj: any) {
    const user = await this.prismas.user.create({
      data: {
        email: obj.email,
        firstName: obj.firstName,
        lastName: obj.lastName,
        avatar: obj.avatar,
        UserName: obj.username,
        bio: obj.bio,
        cover: obj.cover,
        updatedAt: new Date(),
      },
    });
    this.generateToken({ id: user.id });

    return user;
  }
  async UserExistance(obj: any) {
    const existance = await this.prismas.user.findUnique({
      where: {
        email: obj.email,
      },
    });
    return existance;
  }
  async generateToken(obj: any) {
    const jw = await this.token.signAsync(obj, {
      expiresIn: '10d',
      secret: this.config.get('JWT_SECRET'),
    });
    return jw;
  }
  async updateFirstTime(body: any) {
    try {
      if (body.UserName.trim() === '')
        throw new NotFoundException('Error: UserName is Empty');
      const checkUser = await this.prismas.user.findUnique({
        where: { id: body.userId },
      });
      if (!checkUser.firstName)
        throw new ForbiddenException('already user updated info');
      const update = await this.prismas.user.update({
        where: { id: body.userId },
        data: {
          firstTime: false,
          UserName: body.UserName,
        },
      });
      if (update && checkUser) return checkUser;
    } catch (error) {
      throw error;
    }
  }

  async finUserById(obj: any) {
    const user = await this.prismas.user.findUnique({
      where: {
        email: obj.email,
      },
      select: {
        id: true,
      },
    });
    return user;
  }
}
