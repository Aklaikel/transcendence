import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { CreateGameDto, UpdateGameDto } from '../../../game/dtos/CreateGame.dtos';

import { GameService } from '../../services/game/game.service';


// /game/crate
@Controller('game')
export class GameController {

    constructor(private gameService: GameService) {}

    @Get(':id')
    getGames(@Param('id') login: string) {
        return  this.gameService.fetchUserGames(login);
    }

    @Post('create')
    createGame(@Body() createGameDto: CreateGameDto) {
        return this.gameService.createGame(createGameDto);
    }

    @Post('update')
    updateGame(@Body() updateGameDto: UpdateGameDto) {
        return this.gameService.updateGame(updateGameDto);
    }

    @Get('/history/:login/:offset')
    async getHistory(@Param('login') login: string, @Param('offset') offset: number) {

        let offsetNumber = Number(offset);


        let numberOfGamesAtSinglePage = 2;

        if (isNaN(offsetNumber)) {
            offsetNumber = 0;
        }

        const games = await this.gameService.getHistory(login, offsetNumber, numberOfGamesAtSinglePage);
        const numberOfGames = await this.gameService.getUserGamesCount(login);

        const numberOfpages = Math.ceil(numberOfGames / numberOfGamesAtSinglePage);

        console.log(numberOfpages);


        return { games, numberOfpages };
    }
    

}
