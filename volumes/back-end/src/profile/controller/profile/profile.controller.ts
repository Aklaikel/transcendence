import { Controller, Get, Param } from '@nestjs/common';

import { ProfileService } from '../../services/profile/profile.service';

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService ) {}

    @Get(':login')
    getUser(@Param('login') login: string ) {
        return this.profileService.fetchUser(login);
    }

}
