/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

  async deleteComment(id: number): Promise<{ message: string }> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!comment) {
      throw new NotFoundException('Comment not found!');
    }
    await this.commentRepository.softRemove(comment);
    return { message: 'Comment soft deleted successfully!' };
  }

  async restoreComment(id: number): Promise<{ message: string }> {
    const restored = await this.commentRepository.restore(id);

    if (restored.affected === 0) {
      throw new NotFoundException('Comment not found or not deleted!');
    }

    return { message: 'Comment restored successfully!' };
  }
}
