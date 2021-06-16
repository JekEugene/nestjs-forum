import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from 'src/post/post.model';
import { User } from './user.model';


@Injectable()
export class UserService {

  constructor(@InjectModel(Post) private PostRep: typeof Post,
              @InjectModel(User) private UserRep: typeof User) { }

  async getUser(id) {
    const user = await this.UserRep.findByPk(id)
    const sendUser = {
        id: user.id,
        name: user.name,
        date: user.date
    }
    return sendUser
  }

  async getUserPosts(id) {
    let posts = await this.PostRep.findAll({ where: { user_id: id }, raw:true })
    posts.forEach((post)=>{
        post.text = post.text.slice(0,500)
    })
    posts.sort((a, b)=>{
        if(a.date > b.date)
            return -1
        if(a.date < b.date)
            return 1
        return 0
    })
    posts = posts.slice(0,5)
    return posts
  }
}
