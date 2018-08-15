import {DbConfig} from '../config'
import mongoose from 'mongoose'

export function initSchema() {
  const files = glob.sync(resolve(__dirname,'./schema','./*.js')).forEach(require);
}

export function connect() {
  console.log(DbConfig)
  return new Promise((resolve,reject)=>{
    mongoose.connect(DbConfig.url);
    mongoose.connection.on('error', err=>{
        throw new Error('数据库连接失败')
    });
    
    mongoose.connection.once('open', ()=>{
      console.log('链接成功')
      resolve();
    });
})
}