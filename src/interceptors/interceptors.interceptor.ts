/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
 
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
 
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
 
    const { method, originalUrl: url, params, query, body } = req;
 
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
 
        const log = {
          time: new Date().toISOString(),
          method,
          url,
          params,
          query,
          body,
          statusCode: res.statusCode,
          executionTime: `${duration}ms`,
        };
 
        const logString = JSON.stringify(log, null, 2) + '\n\n';
        const filePath = path.join(process.cwd(), 'logs.txt');
 
        try {
          fs.appendFileSync(filePath, logString, { encoding: 'utf8' });
        } catch (err) {
          console.error('Error writing log:', err);
        }
      }),
    );
  }
}
 
 
