var request = window.indexedDB.open('yo', 4);
var db, objectStore;
request.onerror = function (event) {
  console.log('数据库打开错误！')
}
request.onsuccess = function(event) {
  db = event.target.result;
  // 如果该表存在，连接数据库成功后读写操作
  if(db.objectStoreNames.contains('person')) {
    add();
    read();
  }
}
request.onupgradeneeded = function(event) {
  db = event.target.result;
  // 新建数据表必须在 upgrade 回调中才能够调用，如果不存在该表就新建
  if (!db.objectStoreNames.contains('person')) {
    db.createObjectStore('person', { keyPath: 'id' });
  }
}

// 新增一条数据
function add() {
  var req = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .add({ id: 2, name: '张三', age: 24, email: 'zhangsan@example.com' });

  req.onsuccess = function (event) {
    console.log('数据写入成功');
  };

  req.onerror = function (event) {
    console.log('数据写入失败');
  }
}

// 读取数据
function read() {
  var req = db.transaction(['person']).objectStore('person').get(1);

  req.onerror = function(event) {
    console.log('事务失败');
  };

  req.onsuccess = function( event) {
    if (req.result) {
      console.log('Name: ' + req.result.name);
      console.log('Age: ' + req.result.age);
      console.log('Email: ' + req.result.email);
    } else {
      console.log('未获得数据记录');
    }
  };
}