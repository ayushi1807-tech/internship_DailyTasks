/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "src/users/user.entity";
import { AuthController } from "./auth.controller";
import {TypeOrmModule} from '@nestjs/typeorm'
 
@Module({    
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
 
export class AuthModule { }