/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/dto/user.dto";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService{
    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}

    async register(dto:CreateUserDto):Promise<User>{
        const user = this.userRepository.create({
            ...dto,
            role:dto.role || 'Reader'
        });
        await this.userRepository.save(user)
        return user;
    }
}
//                                                                                                                                                                                                                                    