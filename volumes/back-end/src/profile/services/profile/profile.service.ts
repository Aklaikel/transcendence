import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ProfileService {

    constructor(private prisma: PrismaService) { }

    async fetchUser(login: string) {

        const user = await this.prisma.user.findFirst({
            where: { UserName: login },
        });

        return user;
    }

}
