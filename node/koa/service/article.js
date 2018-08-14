import mArticle from '../models/article'
import mongoose from 'mongoose'


function route(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

export default  class ArticleController {
  finds() {
    return mArticle.find()
  }
  async update(id) {
    try {
      await mArticle.update({'_id': id}, { 
        content: `修改${(new Date()).getMinutes()}`,
        title: `修改${(new Date()).getHours()}`,
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