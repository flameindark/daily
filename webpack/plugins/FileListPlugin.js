class FileListPlugin {
    constructor (options) {}

    apply(compiler) {
        compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
            var fileList = 'In this build :\n\n'
            for(var filename in compilation.assets) {
                fileList += ('-' + filename + '\n');
            }
            console.log(compilation)
            compilation.assets['./filelist.md'] = {
                source: function() {
                    return fileList;
                },
                size: function() {
                    return fileList.length
                }
            }
            // console.log(compilation.assets) //这个信息里面包含了所有编译出来的文件名称

        })
    }
}
module.exports = FileListPlugin