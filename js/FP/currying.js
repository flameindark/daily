/**
 * example 1
 */
let story = (who, where, what) => 
  who + ' is in ' + 
  where + ' to ' +
  what

console.log(story('Lihua', 'supermarket', 'buy a shirt'))



// curry version 
let currySotry = 
  who => 
  where => 
  what => 
  who + ' is in ' + 
  where + ' to ' +
  what
console.log(currySotry('Lihua')('supermarket')('buy a shirt'))



// use lodash version
const _ = require('lodash')

story = _.curry(story);

let lihuaInWhere = story('Lihua');
let lodashStory = lihuaInWhere('supermarket');

console.log(lodashStory('buy a shirt'))




/**
 * example 2
 */
let data = [
  {name: 'Lihua', country: 'China'},
  {name: 'Linn', country: 'Japan'},
  {name: 'Mori', country: 'Japan'},
  {name: 'John', country: 'USA'}
]

let isJapanese = (country,obj) => 
  obj.country === country


let japanese = data.filter(man => isJapanese('Japan',man))
console.log(japanese)

//lodash version
let curryIsJapanese = _.curry((country,obj) => obj.country === country)

let curryJapanese = data.filter(curryIsJapanese('Japan'))
console.log(curryJapanese)

// 总结这个示例中curry的作用：
// 能够削减所需的参数，因为curry化返回的是一个函数，这个函数的参数是原来多参数版本的函数的第一个参数。
// 所以这里的curryIsJapanese('Japan')就变成只需要一个参数的函数拉