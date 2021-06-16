import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { Comment } from './comment.model';

@Injectable()
export class PostService {

  constructor(@InjectModel(Post) private PostRep: typeof Post,
              @InjectModel(Comment) private CommentRep: typeof Comment) { }

  async getAllPosts() {
    try {
      const posts = await this.PostRep.findAll({raw: true})
      posts.forEach((post)=>{
          post.text = post.text.slice(0, 500)
      })
      return posts
    } catch (err) {
        console.log(err)
    }
  }

  async getPost(id: string) {
    const post = await this.PostRep.findByPk(+id)
    return post
  }

  async getComments(id: string) {
    const comments = await this.CommentRep.findAll({ where: { post_id: id }, raw:true })
    return comments
  }

  async addPost(user, body) {
    if (user.role == 'user' || user.role == 'moder' || user.role == 'admin') {
      const { title, text } = body
      await this.PostRep.create({
        user_id: user.id,
        user_name: user.name,
        title,
        text,
        date: Date.now().toString(),
      })
    }
  }

  async deletePost(user, body) {
    const post_id = body.post_id
    const post = await this.PostRep.findOne({ where: { id: post_id }, raw: true })
    if(post.user_id == user.id || user.role == "moder" || user.role == "admin"){
      await this.PostRep.destroy({ where: { id: post_id } })
        return {msg: "Post deleted", type: "success"}
    } else {
        return {msg: "Cannot delete post", type: "error"}
    }
  }
  
  async addComment(user, body) {
    const {commentText, post_id} = body
    Comment.create({
        post_id,
        user_id: user.id,
        user_name: user.name,
        text: commentText,
        date: Date.now().toString(),
    })
    return {msg: "the comment was sent", type: "success"}
  }

  async deleteComment(user, body) {
    const comment_id = body.comment_id
    console.log('comment')
    console.log(comment_id)
    const comment = await this.CommentRep.findOne({ where: { id: comment_id }, raw:true})
    if(comment.user_id == user.id || user.role == 'moder' || user.role == 'admin' ){
      await this.CommentRep.destroy({ where: { id: comment_id } })
        return {msg: "Comment deleted", type: "success"}
    } else {
        return {msg: "Cannot delete comment", type: "error"}
    }
  }
}
