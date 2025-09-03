/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import {ForbiddenException,Injectable,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from 'src/dto/post.dto';
import { UpdatePostDto } from 'src/dto/UpdatePostDto';
import { CreateCommentDto } from 'src/dto/comment.dto';
import { User } from 'src/users/user.entity';
import { Comment } from 'src/comments/comment.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  // create Post 
  async create(dto: CreatePostDto, data: CreatePostDto & { userId: number; }): Promise<Posts> {
    const post = this.postRepository.create({
      ...data,

      user: { id: data.userId },
    });
    return await this.postRepository.save(post);
  }

  // Update Post
  async update(
  id: number,
  userId: number,
  data: Partial<UpdatePostDto>,
): Promise<Omit<Posts, 'user'>> {
  const post = await this.postRepository.findOne({
    where: { id },
    relations: ['user'],
  });

  if (!post) throw new NotFoundException('Post not found!!');
  if (post.user.id !== userId) throw new ForbiddenException('You can only update your own posts.');

  Object.assign(post, {
    ...data,
    status: data.status === 'published' ? 'published' : 'draft',
  });

  const saved = await this.postRepository.save(post);

  //  Remove user before returning
  const { user, ...rest } = saved;
  return rest;
}

  // Get All posts
  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    paginate = true,
  ): Promise<{ data: Posts[]; total: number; page: number; limit: number }> {
    const query = this.postRepository.createQueryBuilder('post');

    if (search) {
      query.where('post.title LIKE :search OR post.content LIKE :search', {
        search: `%${search}%`,
      });
    }

    if (paginate) {
      query.skip((page - 1) * limit).take(limit);
    }

    query.orderBy('post.id', 'DESC');

    const [data, total] = await query.getManyAndCount();

    return { data, total, page, limit };
  }

  // Get One With Comments
  async findOneWithComments(id: number): Promise<Posts | null> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
  }

  // Soft Delete Post
  async deletePost(id: number): Promise<{ message: string }> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post) throw new NotFoundException('Post not found!');

    await this.postRepository.softRemove(post);
    return { message: 'Post soft deleted successfully!' };
  }

  // Restore post which is delete
  async restorePost(id: number): Promise<{ message: string }> {
    await this.postRepository.restore(id);
    return { message: 'Post restored successfully!' };
  }

  // Create Comment 
  async createComment(postId: number, userId: number, data: CreateCommentDto) {
  const post = await this.postRepository.findOne({ where: { id: postId } });
  if (!post) throw new NotFoundException('Post not found!');

  const user = await this.userRepository.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundException('User not found!');

  const comment = this.commentRepository.create({
    content: data.content,
    post,
    user,
  });

  const saved = await this.commentRepository.save(comment);

  return {
    id: saved.id,
    content: saved.content,
    createdAt: saved.createdAt,
    userId: user.id,
    postId: post.id,
  };
}

}
