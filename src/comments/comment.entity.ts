/* eslint-disable prettier/prettier */
import { Post } from "src/posts/post.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment{
    @PrimaryGeneratedColumn()
    id:string

    @Column()
    content:string

    @CreateDateColumn({type:"timestamp"})
    createdAt:Date

    @ManyToOne(()=>Post,(post)=>post.comments,{onDelete:"CASCADE"})
    post:Post[]

    @ManyToOne(()=>User,(user)=>user.comments,{onDelete:"CASCADE"})
    user:User[]

}