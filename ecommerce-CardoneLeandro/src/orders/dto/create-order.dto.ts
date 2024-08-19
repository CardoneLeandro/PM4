import {IsEmpty, IsString, IsUUID} from "class-validator";


export class CreateOrderDto {
    
    @IsUUID()
    @IsEmpty()
    uId:string

    @IsString()
    @IsEmpty()
    psId:string[]
}
