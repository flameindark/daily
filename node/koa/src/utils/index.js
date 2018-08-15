import fs from 'fs'

export function readFileThunk (src) {
  return new Promise(function (resolve, reject) {
    fs.readFile(src, 'binary', function (err, data) {
      if(err) return reject(err);
      resolve(data);
    });
  });
}

export function connectDB() {
  
    // 链接mongodb
    let db = mongoose.connection;
    
    // 开始连接
    mongoose.connect('mongodb://localhost/test');

    

}