export default function (ctx, next) {
  return next().catch((err) => {
    console.log(err)
    ctx.body = err.status
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else if (404 == err.status) {
      ctx.status = 404;
      ctx.body = '没有找到...'
    } else {
      throw err;
    }
  })
}