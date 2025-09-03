/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/dto/user.dto";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
 
@Injectable()
export class AuthService{
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
   
    async register(data: Partial<CreateUserDto>): Promise<User> {
        const user = this.userRepository.create({
            ...data,
            role: data.role || 'Reader'
        })
        
        user.refreshToken = process.env.REFRESH_TOKEN_SECRET!
        const saved = await this.userRepository.save(user)
        return saved
    }

    async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = await user.generateAccessToken(user.role);
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await this.userRepository.save(user);

        return { accessToken, refreshToken };
    }
   
   
}
//                                                                                                                                                
 