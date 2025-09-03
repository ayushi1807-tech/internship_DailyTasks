/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Posts } from './post.entity';
import { User } from 'src/users/user.entity';
import { Comment } from 'src/comments/comment.entity';
import {CacheModule} from '@nestjs/cache-manager'

@Module({
  imports:[TypeOrmModule.forFeature([Posts,Comment,User]),
  CacheModule.register({
    ttl:60,
    max:100
  })
],

  providers: [PostsService],
  controllers: [PostController]
})
export class PostsModule {}
