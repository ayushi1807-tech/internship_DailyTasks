/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
        return next.handle().pipe(
            map((response: any) => {
                const ctx = context.switchToHttp();
                const res = ctx.getResponse();
 
                
                const statusCode = res.statusCode ?? 200;
                let message = 'Success';
                let metadata = {};
                let data = response;
 
                
                if (
                    response &&
                    typeof response === 'object' &&
                    'data' in response &&
                    'metadata' in response
                ) {
                    data = response.data;
                    metadata = response.metadata;
                    message = response.messageCode || message;
                }
 
                return {
                    statusCode,
                    message,
                    metadata,
                    data,
                };
            }),
        );
    }
}