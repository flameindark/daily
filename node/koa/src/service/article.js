import mArticle from '../models/article'
import mongoose from 'mongoose'

export default  class ArticleService {
  async finds() {
    return await mArticle.find()
  }
  async update(id, reqData) {
    try {
      await mArticle.update({'_id': id}, reqData)
      return {
        error: 0,
        data: 'success'
      }
    } catch (e) {
      console.log(e);
      return {
        error: 1,
        data: 'update fail'
      }
    }
  }
  async add(reqData) {
    let article = new mArticle(reqData);
    return new Promise((resolve, reject) => {
      article.save((err, data) => {
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
  async find(id) {
    try {
      return await mArticle.findById(id)
    } catch (e){
      return {
        error: 0,
        data: null
      }
    }
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      mArticle.deleteOne({ '_id': id }, function (err, data) {
        if (err) reject(err);
        else resolve(data)
        // deleted at most one tank document
      });
    })
  }
}