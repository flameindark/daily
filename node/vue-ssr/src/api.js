export default {
  getDataApi () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('模拟异步获取数据');
      }, 1000);
    });
  }
}