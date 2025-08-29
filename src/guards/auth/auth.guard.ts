/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from'jsonwebtoken'
import {Request} from 'express'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private ConfigService:ConfigService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.headers['authorization'];

    if(!authHeader || !authHeader.startsWith('Bearer ')){
      throw new UnauthorizedException('No Token Provided!!')
    }
    const token = authHeader.split(' ')[1]
    const jwtSecret = this.ConfigService.get<string>('ACCESS_TOKEN_SECRET')

    if(!jwtSecret){
      throw new UnauthorizedException("JWT Secret not Found!!")
    }
    try{
      const decode = jwt.verify(token,jwtSecret)
      request['user'] = decode;
       return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(error){
      throw new UnauthorizedException('Invalid Token')
    }
  
  }
}
