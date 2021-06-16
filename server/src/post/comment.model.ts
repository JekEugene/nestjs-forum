
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";
import { Post } from "./post.model";

interface CommentCreationAttrs {
  post_id: string
  user_id: string
  user_name: string
  text: string
  date: string
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number
  @Column({ type: DataType.STRING, allowNull: false})
  user_name: string
  @Column({ type: DataType.STRING, allowNull: false})
  text: string
  @Column({ type: DataType.STRING, allowNull: false})
  date: string

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER, allowNull: false})
  post_id: number

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  user_id: number;
}