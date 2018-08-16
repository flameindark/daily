import multer from 'koa-multer'
import Router from 'koa-router'
import {uploadPath} from '../config'

let router = new Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if(file.mimetype.split('/')[0] === 'image') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
});

router.post('/', upload.single('file'), async (ctx) => {
  console.log(ctx)
  if(ctx.req.file) {
    ctx.body = {
      filename: ctx.req.file.filename//返回文件名
    }
  } else {
    ctx.body = {
      message: '上传出错...请检查文件格式'
    }
  }
});

export default router;