/* eslint-disable prettier/prettier */
import { Body, Controller,Post } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}
    @Post()
    async createUser(@Body() body:User):Promise<User>{
        return this.userService.create(body)
    }
}
