/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Posts } from "src/posts/post.entity";
import { User } from "src/users/user.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Posts, (post) => post.comments, { onDelete: "CASCADE" })
  post: Posts;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  user: User;
}
