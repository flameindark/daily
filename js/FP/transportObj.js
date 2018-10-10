// 使用寒函数式编程简化数据的格式化操作
const fs = require('fs');
let data = fs.readFileSync('./data.txt', 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.split('\t'))
  .reduce((productions, line) => {
    productions[line[0]] = productions[line[0]] || [];
    productions[line[0]].push({
      name: line[1],
      price: line[2],
      quality: line[3]
    })
    return productions;
  }, {})

console.log(data)