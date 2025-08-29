/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
 
export class CreatePostDto{
    @IsNotEmpty()
    @IsString()
    title: string;
 
    @IsNotEmpty()
    @IsString()
    content: string;
 
    @IsEnum(['draft', 'published'])
    status: 'draft' | 'published'
 
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}