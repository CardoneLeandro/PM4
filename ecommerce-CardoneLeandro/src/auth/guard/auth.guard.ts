import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { SignInDTO } from "../dto/signIn.dto";
import { UsersService } from "src/users/users.service";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthGueard implements CanActivate {
    constructor(
        private readonly usersService:UsersService,
        private readonly signInDTO:SignInDTO
    ){}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req:Request = context.switchToHttp().getRequest()
        const authHeader = req.headers['authorization']
    if(!authHeader) {throw new UnauthorizedException('Authorization missing')}

    const [type, credentials] = authHeader.split(' ')
    if(type !== 'Basic' || !credentials) {throw new UnauthorizedException('Invalid Authorization format')}

    const [email, password] = Buffer.from(credentials, 'base64').toString().split(':')
 
    return
}

async validateUser(email:string, password:string):Promise<boolean>{
    const searchParams = {email}
    const existingUser = await this.usersService.findOneBy(searchParams)
    return
}


}
