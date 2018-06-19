const fs = require('fs') 
const path = require('path')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const { transformFromAst } = require('babel-core')

let ID = 0

function createAsset (filename) {
  // 读取文件内容
  const content = fs.readFileSync(filename, 'utf-8')

  // 转化成AST
  const ast = babylon.parse(content, {
    sourceType: 'module',
  });


  // 该文件的所有依赖
  const dependencies = []

  // 获取依赖声明
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    }
  })

  // 转化ES6语法到ES5
  const {code} = transformFromAst(ast, null, {
    presets: ['env']
  })

  // 分配ID
  const id = ID++

  // 返回这个模块
  return {
    id,
    filename,
    dependencies,
    code,
  }
}

// 建立依赖关系图谱
function createGragh(entry) {
    const mainAsset = createAsset(entry)

    //维护一个数数数组，从入口模块开始
    const queue = [mainAsset]

    // 遍历数组，分析依赖如果有则把依赖推入数组
    for(const asset of queue) {
        const dirname = path.dirname(asset.filename);
        asset.dependencies.forEach(relativePath => {
            // 把依赖模块的相对路径转换为绝对路径（原来还能这样组装的！）
            const absolutPath = path.join(dirname, relativePath)
            // 解析依赖模块
            const child = createAsset(absolutPath)
            // 把依赖关系写入模块的mapping当中
            !asset.mapping && (asset.mapping = {})
            asset.mapping[relativePath] = child.id
            // 把这个依赖模块推入到queue数组中(递归)，以便继续对其进行分析
            queue.push(child)
        })
    }
    return queue
}
const here = path.resolve(__dirname, './src/entry.js')

// 根据CommonJs规范进行打包
function bundle (graph) {
    let modules = ''
  
    graph.forEach(mod => {
      modules += `${mod.id}: [
        function (require, module, exports) { ${mod.code} },
        ${JSON.stringify(mod.mapping)},
      ],`
    })
  
    const result = `
      (function(modules) {
        function require(id) {
          const [fn, mapping] = modules[id];
  
          function localRequire(name) {
            return require(mapping[name]);
          }
  
          const module = { exports : {} };
  
          fn(localRequire, module, module.exports);
  
          return module.exports;
        }
  
        require(0);
      })({${modules}})
    `
    return result
  }
const dist = bundle(createGragh('./src/entry.js'))

fs.access('./dist', fs.constants.F_OK, (err) => {
    err && fs.mkdir('./dist')
    fs.writeFile('./dist/bundle.js', dist, 'utf8', function(err){
        // if(err) {
        //     fs.mkdir('./dist')
        // }
        console.log('文件写入成功');
    });
});
  
// fs.mkdir('./dist', function(err){
//     if(err) throw err;
//     console.log('目录创建成功');
// });

// fs.writeFile('./dist/bundle.js', dist, 'utf8', function(err){
//     // if(err) {
//     //     fs.mkdir('./dist')
//     // }
//     console.log('文件写入成功');
// });