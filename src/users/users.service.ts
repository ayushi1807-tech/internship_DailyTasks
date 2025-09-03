/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async findAll(
  page = 1,
  limit = 10,
  search?: string,
  paginate = true,
): Promise<{ data: any[]; total?: number; page?: number; limit?: number }> {
  const query = this.userRepository.createQueryBuilder('user');

  
  query.where('user.role IN (:...roles)', { roles: ['Reader', 'Author'] });

  
  if (search) {
    query.andWhere('(user.name ILIKE :search OR user.email ILIKE :search)', {
      search: `%${search}%`,
    });
  }

 
  if (!paginate) {
    const users = await query.orderBy('user.id', 'ASC').getMany();
    const data = users.map(({ password, refreshToken, ...rest }) => rest);
    return { data };
  }

  
  query.skip((page - 1) * limit).take(limit).orderBy('user.id', 'ASC');

  const [users, total] = await query.getManyAndCount();

  
  const data = users.map(({ password, refreshToken, ...rest }) => rest);

  return { data, total, page, limit };
}

}

