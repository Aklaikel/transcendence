import { IsInt, IsString } from "class-validator";


export class CreateNotificationDto {
    @IsInt()
    from: number;

    @IsInt()
    to: number;

    @IsString()
    type: string;
}

export class readNotificationDto {
    
    @IsInt()
    id: number;
}