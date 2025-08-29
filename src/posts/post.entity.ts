/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import{Comment} from 'src/comments/comment.entity'
import { User } from 'src/users/user.entity'
import {Entity,PrimaryGeneratedColumn,Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm'

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    content:string

    @CreateDateColumn({type:"timestamp"})
    createdAt:Date

    @UpdateDateColumn({type:"timestamp"})
    updatedAt:Date

    @Column({
        type:"enum",enum:['Draft',"Published"],default:"Draft"
    })
    status:'Draft'|"Published"

    @ManyToOne(()=>User,(user)=>user.posts,{onDelete:"CASCADE"})
    user:User

   
    @OneToMany(()=>Comment,(comment)=>comment.post,{cascade:true})
    comments:Comment[]
}