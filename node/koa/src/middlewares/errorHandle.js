export default async function (ctx, next) {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    ctx.body = err.status
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        error: 0,
        data: '没有相应的权限...'
      };
    } else if (404 === err.status) {
      ctx.status = 404;
      ctx.body = {
        error: 404,
        message: '没有找到...'
      }
    } else {
      throw err;
    }
  }
}