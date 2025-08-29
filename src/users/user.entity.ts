/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Comment } from 'src/comments/comment.entity';
import { Post } from 'src/posts/post.entity';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'User' })
  role: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @Column()
  refreshToken: string;

  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async isPasswordCorrect(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  async generateAccessToken(role: string): Promise<string> {
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        name: this.name,
        role: role,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn:"15m"
      },
    );
  }

  async generateRefreshToken():Promise<string>{
    return jwt.sign(
        {
            id:this.id
        },
        process.env.REFRESH_TOKEN_SECRET!,
        {expiresIn:"7d"}
    )
  }

}

//
