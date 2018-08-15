import mArticle from '../models/article'
import mongoose from 'mongoose'
import { resolve } from 'url';
import { reject } from '../node_modules/any-promise';


function route(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

export default  class ArticleController {
  async finds() {
    return await mArticle.find()
  }
  async update(id) {
    try {
      await mArticle.update({'_id': id}, { 
        content: `修改${(new Date()).getSeconds()}`,
        title: `修改${(new Date()).getMinutes()}`,
        tags: ['node1', 'javascript1'],
        category: ['小时1'],
        readNum: 3 
      })
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
  async add() {
    let article = new mArticle({ 
        content: `添加${(new Date()).getSeconds()}`,
        title: `添加${(new Date()).getMinutes()}`,
        tags: ['node', 'javascript'],
        category: ['小时'],
        readNum: 1   
    });
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
}