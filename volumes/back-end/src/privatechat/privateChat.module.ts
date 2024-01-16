import { Module } from "@nestjs/common";


import { privateChatController } from "./privateChat.controller";
import { privateChatservice } from "./privateChat.service";

@Module({
    imports: [],
    controllers: [privateChatController],
    providers: [privateChatservice],
})
export class privateChatModule { }