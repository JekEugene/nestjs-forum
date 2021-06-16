
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";
import { Comment } from "./comment.model";

interface PostCreationAttrs {
  user_name: string
  user_id: number
  title: string
  text: string
  date: string
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number
  @Column({ type: DataType.STRING, allowNull: false})
  user_name: string
  @Column({ type: DataType.STRING, allowNull: false})
  title: string
  @Column({ type: DataType.STRING, allowNull: false})
  text: string
  @Column({ type: DataType.STRING, allowNull: false})
  date: string

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  user_id: number;

  @HasMany(()=>Comment)
  comments: Comment[]
}