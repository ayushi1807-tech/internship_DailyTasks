/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
 
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
 
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error or email already exists.' })
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
 
  @Post('login')
  @ApiOperation({ summary: 'Login user and return JWT tokens' })
  @ApiResponse({ status: 200, description: 'Login successful, returns access and refresh tokens.' })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto.email, dto.password);
  }
}