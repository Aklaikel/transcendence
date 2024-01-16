import { Strategy } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { connectService } from '../connectService';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private authService: connectService, config: ConfigService) {
    super({
      clientID: config.get('CLIENT_ID'),
      clientSecret: config.get('CLIENT_SECRET'),
      callbackURL: config.get('CALLBACK'),
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, data: any) => void,
  ): Promise<any> {
    const user = {
      firstName: profile.name.givenName,
      email: profile.emails[0].value,
      lastName: profile.name.familyName,
      avatar: profile._json.image.link,
      username: profile.username,
    };
    return user;
  }
}
