/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty,  IsString } from "class-validator";
 
export class CreatePostDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;
 
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    content: string;
 
    @ApiProperty()
    @IsEnum(['draft', 'published'])
    status: 'draft' | 'published'
    
    // @ApiProperty()
    // @IsNotEmpty()
    // @IsNumber()
    // userId: number;
}