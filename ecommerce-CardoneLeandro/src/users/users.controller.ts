import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUser():string {
        return this.usersService.getUser();
    }

    @Get('profile')
    getUserProfile():string {
        return 'Profile';
    }

    @Get('profile/:id')
    getUserProfileId(@Param('id') id:string):string {
        return 'Profile Id';
    }
    
    @Post()
    addUser():string {
        return 'This action adds a new user';
    }

    @Put()
    updateUser():string {
        return 'This action updates a user';

    }

    @Delete()
        deleteUser():string {
            return 'This action deletes a user';
        }
}

