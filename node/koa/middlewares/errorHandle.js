export default function (ctx, next) {
  return next().catch((err) => {
    ctx.body = err.status
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  })
}