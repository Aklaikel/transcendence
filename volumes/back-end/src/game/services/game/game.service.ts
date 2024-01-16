import { Injectable } from '@nestjs/common';
import { CreateGameDto, UpdateGameDto } from '../../../game/dtos/CreateGame.dtos';
import { PrismaService } from '../../../prisma/prisma.service';
import { count } from 'console';



@Injectable()
export class GameService {

    constructor(private prisma: PrismaService) { }

    getUser(login: string) {
        return this.prisma.user.findFirst({
            where: { UserName: login },
        });
    }

    async fetchUserGamesLimited(login: string, limit: number, offset: number = 0) {

        const { id } = await this.getUser(login);

        const games = await this.prisma.game.findMany({
            where: {
                OR: [
                    {
                        firstPlayer: {
                            id
                        }
                    },
                    {
                        secondPlayer: {
                            id
                        }
                    }
                ]
            },
            select: {
                id: true,
                firstPlayerScore: true,
                secondPlayerScore: true,
                createdAt: true,
                firstPlayer: {
                    select: {
                        UserName: true,
                        id: true,
                    }
                },
                secondPlayer: {
                    select: {
                        UserName: true,
                        id: true,
                    }
                }
            },
            skip: offset * limit,
            take: limit,

        });

        return games;

    }


    async fetchUserGames(login: string) {
        return this.fetchUserGamesLimited(login, 5);
    }

    async createGame(createGameDto: CreateGameDto) {

        const game = await this.prisma.game.create({
            data: {
                firstPlayerId: createGameDto.firstPlayerId,
                secondPlayerId: createGameDto.secondPlayerId,
                firstPlayerScore: 0,
                secondPlayerScore: 0,
            }
        });


        return game;

    }

    async updateGame(updateGameDto: UpdateGameDto) {

        const game = await this.prisma.game.update({
            where: { id: updateGameDto.id },
            data: {
                firstPlayerScore: updateGameDto.firstPlayerScore,
                secondPlayerScore: updateGameDto.secondPlayerScore,
            }
        });

    }

    async getUserGamesCount(login: string) {

        const { id } = await this.getUser(login);

        
        const count = await this.prisma.game.count({
            where: {
                OR: [
                    {
                        firstPlayer: {
                            id: id
                        }
                    },
                    {
                        secondPlayer: {
                            id: id
                        }
                    }
                ]
            }
        })
        
        return count;
    }

    async getHistory(login: string, offset: number, limit: number) {
        return this.fetchUserGamesLimited(login, limit, offset);
    }
}
