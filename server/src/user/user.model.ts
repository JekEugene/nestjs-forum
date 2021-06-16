import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "../post/post.model";
import { Comment } from "../post/comment.model";

interface UserCreationAttrs {
  email: string
  password: string
  name: string
  date: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number
  @Column({ type: DataType.STRING, unique: true, allowNull: false})
  email: string
  @Column({ type: DataType.STRING, allowNull: false})
  password: string
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'user'})
  role: string
  @Column({ type: DataType.STRING, allowNull: false})
  name: string
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  token: string[]
  @Column({ type: DataType.STRING, allowNull: false})
  date: string
  @HasMany(()=>Post)
  posts: Post[]
  @HasMany(()=>Comment)
  comments: Comment[]
}