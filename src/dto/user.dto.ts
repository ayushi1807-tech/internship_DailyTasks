/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsJWT, IsNotEmpty, IsString, MinLength, } from 'class-validator'
 
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
 
    @IsNotEmpty()
    @IsEmail()
    email: string;
 
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
 
    @IsEnum(['admin', 'author', 'reader'])
    role: 'admin' | 'author' | 'user';

   @IsJWT()
    refreshToken?: string | undefined;
 
    @IsJWT()
    accessToken?: string | undefined;
}
       