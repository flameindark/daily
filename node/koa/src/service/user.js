import mUser from '../models/user'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import {secret} from '../config'


export default  class UserService {
  async login(user) {
    let data = mUser.find(user);
    if(data) {
      return {
        error: 0,
        message: '登录成功',
        token: jwt.sign({
          data: user,
          exp: Math.floor(Date.now() / 1000) + 15, // 60 seconds * 60 minutes = 1 hour
        }, secret)
      }
    } else {
      return {
        error: 0,
        message: '用户名或密码错误'
      }
    }
  }

  async register(reqData) {
    let user = new mUser(reqData);
    return new Promise((resolve, reject) => {
      user.save((err, data) => {
        if(err) {
          console.log(err)
          reject(err)
        } else {
          console.log(data)
          resolve(data)
        }
      })
    })
  }
}