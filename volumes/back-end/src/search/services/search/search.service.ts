import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';


@Injectable()
export class SearchService {

    constructor(private prisma: PrismaService) { }
    
    async search(query: string) {

        const users = await this.prisma.user.findMany({
            where: {
                UserName: {
                    contains: query
                }
            },
            select: {
                id: true,
                UserName: true,
                avatar: true,
            }
        });

        return users;
    }
}
