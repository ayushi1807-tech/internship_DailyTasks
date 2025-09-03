/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
 
export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  // @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;
 
  @ApiProperty({ example: 'john@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
 
  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
 
  @ApiPropertyOptional({ example: 'reader', enum: ['admin', 'author', 'reader'] })
  @IsOptional()
  @IsEnum(['admin', 'author', 'reader'])
  role?: 'admin' | 'author' | 'reader';
}