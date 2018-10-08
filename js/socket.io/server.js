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

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    socket.broadcast.emit('hi');
    console.log('message: ' + msg);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});