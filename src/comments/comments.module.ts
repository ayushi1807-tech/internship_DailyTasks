/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentController } from './comments.controller';
import { CommentService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';

@Module({
   imports:[TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentsModule {}
