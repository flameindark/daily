// 递归

/**
 * simple example (loop and recursion all can do)
 */
let countDownFrom = num => {
  if(num === 0) return;
  console.log(num)
  countDownFrom(num-1)
}

countDownFrom(10)

let countDownLoop = num => {
  for(var i=num; i>0; i--) {
    console.log(i)
  }
}

countDownLoop(10)


/**
 * 特别适合用递归来做的
 * 示例：生成树
 */

let treeData = [
  {id: 'animal', parent: null},
  {id: 'dog', parent: 'animal'},
  {id: 'cat', parent: 'animal'},
  {id: 'pug', parent: 'dog'},
  {id: 'black cat', parent: 'cat'}
]

let makeTree = (treeData, parent) => {
  let node = {}
  treeData
    .filter(creature => creature.parent === parent) // 选出子类
    .forEach(c => node[c.id] = makeTree(treeData, c.id)) // 将子类插入node，并且递归寻找他的子类

  return node
}

console.log(JSON.stringify(makeTree(treeData, null)))