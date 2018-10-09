const shortId = require('shortid')

function serverIndex(req, res) {
  res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>socketio</title>
    </head>
    <body>
      使用socketIo
    </body>
    </html>
  `)
  res.end();
}
var http = require('http').Server(serverIndex);
var io = require('socket.io')(http);
const rooms = [];

io.on('connection', function(socket){
  console.log(`a user ` + socket.id + ` connected`);

  // 添加房间
  socket.on('create room', function() {
    const roomId = shortId.generate();
    room = {
      id: roomId,
      isJoin: false
    }
    rooms.push(room);
    io.emit('add room', room)
  })
  // 发送消息
  socket.on('broadcast room', function(data) {
    // 要自己也能看到自己的消息就用io.to方法,否则只有其他人的信息能看到
    io.to(data.roomId).emit('room msg', {
      roomId: data.roomId,
      msg: data.msg
    })
  })
  // 加入房间
  socket.on('join room', (roomId) => {
    socket.to(roomId).emit('room msg', {
      roomId,
      msg: `用户${socket.id}加入该房间`
    })
    socket.join(roomId, () => {
      socket.emit('join_rooms', Object.keys(socket.rooms))
    })
  })
  // 离开房间
  socket.on('leave room', (roomId) => {
    socket.to(roomId).emit('room msg', {
      roomId,
      msg: `用户${socket.id}退出该房间`
    })
    socket.leave(roomId, () => {
      socket.emit('join_rooms', Object.keys(socket.rooms))
    })
  })
  // 发送现有房间信息
  socket.emit('rooms', rooms)
});

http.listen(3000, function(){
  console.log('listening on http://127.0.0.1:3000');
});