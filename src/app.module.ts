/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './guards/auth/auth.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }),TypeOrmModule.forRoot({
    type:"postgres",
    url:process.env.DATABASE_URI,
    autoLoadEntities:true,
    synchronize:true
  }),
  
   UsersModule, PostsModule, CommentsModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
