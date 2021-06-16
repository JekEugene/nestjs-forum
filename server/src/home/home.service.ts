import { Injectable, Request, Response } from '@nestjs/common';
import { User } from 'src/user/user.model';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class HomeService {

  constructor(@InjectModel(User) private userRep: typeof User){}

  async homePage(user) {
    return user
  }

  async login(user, body, res) {
    try {
      const { email, password } = body
      const candidate = await this.userRep.findOne({ where: { email: email }, raw: true})
      if (candidate) {
          const areSame = await bcrypt.compare(password, candidate.password)
          if (areSame) {
              const user = {
                  name: candidate.name,
                  id: candidate.id,
                  role: candidate.role
              }
              res.cookie("name", `${user.name}`,{httpOnly: false})
              res.cookie("role", `${user.role}`, {httpOnly: false})
              res.cookie("id", `${user.id}`, { httpOnly: false })
              return Object.assign(user, {msg: "", type: "hide"})
          } else {
              return Object.assign( user, {msg: "wrong email or password", type: "error"})
          }
      } else {
          return Object.assign( user, {msg: "wrong email or password", type: "error"})
      }
    } catch (e) {
        console.log(e)
    }
  }

  async register(body) {
    try {
      const {email, name, password} = body
      const user = await User.findOne({ where: { email: email }, raw: true })
      if (user) {
        return Object.assign( user, {msg: "user already exist", type: "error"})
      }
      let hashPassword = await bcrypt.hash(password, 10)
      let newUser = await this.userRep.create({
          email,
          password: hashPassword,
          name,
          date: Date.now().toString()
      })
      return Object.assign( newUser, { msg: "registration completed successfully", type: "success" })
    } catch (e) {
      return Object.assign({ name: 'guest', role: 'guest'}, {msg: "registration failed", type: "error"})
    }
  }

  async logout(req, res) {
    res.clearCookie("id")
    res.clearCookie("name")
    res.clearCookie("role")
    return {name: 'guest', role: 'guest'}
  }
}
