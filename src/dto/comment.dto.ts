/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
 
export class CreateCommentDto{
    @IsNotEmpty()
    @IsString()
    content: string;
 
    @IsNotEmpty()
    @IsNumber()
    postId: number;
 
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}