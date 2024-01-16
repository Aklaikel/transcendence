import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from "@nestjs/common";
import { privateChatservice } from "./privateChat.service";
import { async } from "rxjs";
import { AuthGuard } from "@nestjs/passport";

@Controller('list')
export class privateChatController{
    constructor(private service: privateChatservice){}

    @Get('/mesage/:user1/:user2')
    // @UseGuards(AuthGuard('yassir'))
    async getMessage(@Param('user1') us1: string,@Param('user2') us2: string){
        return await this.service.listMessage(parseInt(us1),parseInt(us2));
        
    }

    @Get('addMessage')
    async addMessage(@Body() body: any)
    {
        return await this.service.addNewMessage(body);
    }


    @Get('/friends/:id')
    // @UseGuards(AuthGuard('yassir'))

    async getFriends(@Param('id') id: string){

        let id1 = parseInt(id);
    
        return await this.service.getFriends(id1);
    
    }


}