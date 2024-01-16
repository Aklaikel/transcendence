import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatRoomDto, UpdateRoomDto } from './chatroom.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import * as fs from 'fs';
import { Gaaa } from 'src/connect/strategy/jwtGuard';

@Controller('room')
@UseGuards(AuthGuard('authGuard'))
@UseGuards(Gaaa)
export class ChatContoller {
  constructor(private readonly chatRooms: ChatroomService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './upload',
        filename(req, file, callback) {
          const name = file.originalname.split('.')[0];
          const ext = file.originalname.split('.')[1];
          const fullname = name + Date.now() + '.' + ext;
          callback(null, fullname);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i))
          return cb(null, false);
        else cb(null, true);
      },
    }),
  )
  async createRoom(
    @UploadedFile()
    file: Express.Multer.File,
    @Body(ValidationPipe) body: ChatRoomDto,
    @Req() req: Request,
  ) {
    await this.chatRooms.protectedUser(
      parseInt(req.headers.userid as string),
      req.user['id'],
    );
    try {
      let fileBuffer;
      !file
        ? (fileBuffer = fs.readFileSync('./upload/default.png'))
        : (fileBuffer = fs.readFileSync(file.path));

      body.image = await this.chatRooms.uploadImage(fileBuffer);
      if (file) fs.unlinkSync(file.path);
      return await this.chatRooms.createRoom(body);
    } catch (error) {
      throw error;
    }
  }

  @Patch('update/:roomId')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './upload',
        filename(req, file, callback) {
          const name = file.originalname.split('.')[0];
          const ext = file.originalname.split('.')[1];
          const fullname = name + Date.now() + '.' + ext;
          callback(null, fullname);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i))
          return cb(null, false);
        else cb(null, true);
      },
    }),
  )
  async UpdateRoom(
    @UploadedFile()
    file: Express.Multer.File,
    @Body(ValidationPipe) body: UpdateRoomDto,
    @Param('roomId') roomId: string,
    @Req() req: Request,
  ) {
    await this.chatRooms.protectedUser(
      parseInt(req.headers.userid as string),
      req.user['id'],
    );
    const id = parseInt(roomId);
    let fileBuffer;

    if (file) {
      fileBuffer = fs.readFileSync(file.path);
      body.image = await this.chatRooms.uploadImage(fileBuffer);
      fs.unlinkSync(file.path);
    }

    return await this.chatRooms.updateroom(body, id);
  }
  //   @Get('avatar/:pathname')
  //   async getPathName(@Param('pathname') pathname: string, @Res() res: Response) {
  //     res.sendFile(pathname, { root: './upload' });
  //   }

  @Get('lastadd/:userId')
  @UseGuards(AuthGuard('authGuard'))
  async getAllRomms(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Req() req: Request,
  ) {
    await this.chatRooms.protectedUser(
      parseInt(req.headers.userid as string),
      req.user['id'],
    );
    return await this.chatRooms.findLatestRoom(userId);
  }
  /* get public and protected rooms */
  @Get('rooms/:userId/:page/:search?')
  async getPublicRooms(
    @Param('userId') userId: number,
    @Param('page') page: number,
    @Param('search') search: string,
    @Req() req?: Request,
  ) {
    await this.chatRooms.protectedUser(
      parseInt(req.headers.userid as string),
      req.user['id'],
    );
    return this.chatRooms.findPublicProtectedRooms(userId, page, search);
  }

  @Delete('delete/:userId/:roomId')
  async deleteRoom(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Param('roomId', new ParseIntPipe()) roomId: number,
    @Req() req: Request,
  ) {
    await this.chatRooms.protectedUser(
      parseInt(req.headers.userid as string),
      req.user['id'],
    );
    return await this.chatRooms.deleteRoom(userId, roomId);
  }

  @Post('exits')
  async checkIfexitsRoom(
    @Body('name') name: string,
    @Body('userId', new ParseIntPipe()) userId: number,
    @Req() req: Request,
  ) {
    await this.chatRooms.protectedUser(
      parseInt(req.headers.userid as string),
      req.user['id'],
    );
    return await this.chatRooms.checkIfexitsRoom(name);
  }

  @Get('usersroom/:roomId')
  async getUserByroom(@Param('roomId', new ParseIntPipe()) roomId: number) {
    return await this.chatRooms.getusersByroom(roomId);
  }
  @Get('blockroom/:roomId')
  async getBlockUsersRoom(@Param('roomId', new ParseIntPipe()) roomId: number) {
    return await this.chatRooms.getblockedUser(roomId);
  }
}
